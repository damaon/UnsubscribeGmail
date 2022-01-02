const imaps = require("imap-simple")
const rp = require('request-promise');
const creds = require("./credentials.json")
const p = console.log;
const SINCE = process.argv[2] || "2022-01-01";

async function run() {
    p(`Running since ${SINCE}`)
    await unsubscribeInbox(creds.email, creds.pw);
    process.exit(0);
}
run();

async function unsubscribeInbox(user, password) {
    const config = {
        imap: {
            user,
            password,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false,
            },
            authTimeout: 3000,
        },
    };

    const connection = await imaps.connect(config);
    await connection.openBox("INBOX");
    const searchCriteria = ["UNSEEN", ["Since", SINCE]];

    /** @type {Connection.FetchOptions} */
    const fetchOptions = {
        bodies: ["HEADER"],
        markSeen: false,
    };

    const results = await connection.search(searchCriteria, fetchOptions);

    const promises = results
        .map((r) => {
            const headers = r.parts[0].body;
            const unsubscribe = headers["list-unsubscribe"];
            return unsubscribe;
        })
        .filter((x) => x)
        .map((x) => x[0].split(", ").filter((s) => s.startsWith("<http")))
        .filter((x) => x.length)
        .flatMap(x => x)
        .map(s => s.substr(1, s.length - 2))
        .map(followUnsubscribeLink);

    await Promise.all(promises)
}

function followUnsubscribeLink(unsubscribeLink) {
    return rp({ uri: unsubscribeLink, simple: false, resolveWithFullResponse: true }).then(r => {
        if (r.statusCode === 200) {
            p(`success: ${unsubscribeLink}`)
        } else {
            p(`fail(${r.statusCode}): ${unsubscribeLink}`)
        }
    })
}
