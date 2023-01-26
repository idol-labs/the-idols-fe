export function formatPercentage(num) {
    return (num / 100).toFixed(2)
}

export function formatUSD(USD) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        
        maximumFractionDigits: 0
    });

    return formatter.format(USD)
}


export function formatEtherString(string, decimals=3) {
    const num = parseFloat(string);

    if (num < 10000) {
        return num.toFixed(decimals)
    }

    let si = [
        {v: 1E3, s: "K"},
        {v: 1E6, s: "M"},
        {v: 1E9, s: "B"},
        {v: 1E12, s: "T"},
        {v: 1E15, s: "P"},
        {v: 1E18, s: "E"}
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

export function formatUSDString(num) {
    if (num < 1000) {
        return num.toFixed(2)
    }

    let si = [
        {v: 1E3, s: "K"},
        {v: 1E6, s: "M"},
        {v: 1E9, s: "B"},
        {v: 1E12, s: "T"},
        {v: 1E15, s: "P"},
        {v: 1E18, s: "E"}
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
        if (num >= si[index].v) {
            break;
        }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

export function formatSecondsToHms(d) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? "hr " : "hrs ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? "min " : "mins ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay; 
}


export function formatEtherToUSD(etherConversion, eth) {
    if (etherConversion && etherConversion.USD) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        const USD = parseFloat(etherConversion.USD)*parseFloat(eth)
        const USDFormat = formatter.format(USD)

        return <span>({USDFormat})</span>
    } else {
        return null
    }
}

export function formatPercentFixed(num, digits=2) {
    return parseFloat(num).toFixed(digits)
}

export function timeAgo(ts) {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.

    var d=new Date();  // Gets the current time
    var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
    var seconds = nowTs-parseInt(ts);

    if (seconds > 86400) {
        const dateObj = new Date(parseInt(ts) * 1000);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear() % 100;

        return `${month}-${day}-${year}`
    }

    if (seconds >= 7200) {
        return Math.floor(seconds/3600) + " hours ago"
    }

    if (seconds > 3599) {
        return Math.floor(seconds/3600) + " hour ago"
    }

    if (seconds >= 120) {
        return Math.floor(seconds/60) + " mins ago";
     }

    if (seconds > 59) {
       return Math.floor(seconds/60) + " min ago";
    }

    if (seconds >= 2) {
        return seconds + " seconds ago";
    }

    return seconds + " second ago"
}

export function formatGodId(godId) {
    const id = parseInt(godId);

    if (id < 10) {
        return `000${id}`
    } else if (id < 100) {
        return `00${id}`
    } else if (id < 1000) {
        return `0${id}`
    } else {
        return id
    }
}