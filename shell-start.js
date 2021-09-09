const https = require('https');
const baseUrl = 'https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&format=xml&hoursBeforeNow=2&mostRecent=true&stationString='
const cloudDecode = {
    'SKC': 'No cloud',
    'CLR': 'Clear',
    'CAVOK': 'Celling and visibility OK',
    'FEW': 'Few cloud',
    'SCT': "Scattered",
    'BKN': "Broken",
    'OVC': "Full cloud",
    'OVX': "Vertical visibility"
};
const ICAO = 'VVNB';

function tD(a) {
    if (a < 10) return '0' + a;
    return a;
}

https.get(baseUrl + ICAO, {timeout: 1000}, (res) => {
    console.log(`It is: ${(new Date()).toLocaleString()}`);

    let data = '', output = `The weather report of ${ICAO}:\n`, t;
    res.on('data', (c) => { data+=c });
    res.on('end', () => {
        if (!data) return console.log(`Request weather for ${ICAO} failed`);

        output += `Temperature: ${(data.match(/<temp_c>(.*)<\/temp_c>/))[1]} celsius degree\n`;

        t = data.match(/<wind_dir_degrees>(.*)<\/wind_dir_degrees>/)[1];
        output += `Wind: ${(t)? t: 'variable wind direction'} @ ${data.match(/<wind_speed_kt>(.*)<\/wind_speed_kt>/)[1]}kt\n`

        t = data.match(/<sky_condition (.*)>/g);
        output += `There are ${t.length} layer(s) of clouds\n`
        for (let layer of t) {
            layer = layer.match(/<sky_condition (.*)\/>/)[1];
            if (layer.includes('cloud_base_ft_agl="')) {
                cov = layer.match(/sky_cover="(.*)" c/)[1];
            } else cov = layer.match(/sky_cover="(.*)"/)[1];
            if (cov == 'FEW' | cov == 'SCT'| cov == 'BKN' | cov == 'OVC') {
                output += `${cloudDecode[cov]} @ ${layer.match(/cloud_base_ft_agl="(.*)"/)[1]}ft | `
            } else if (cov == 'OVX') {
                output += `${cloudDecode[cov]}: ${data.match(/<vert_vis_ft>(.*)<\/vert_vis_ft>/)[1]}ft | `
            } else output += `${cloudDecode[cov]} | `
        }
        if (t.length > 2) output += '\n';

        t = parseInt(data.match(/<visibility_statute_mi>(.*)<\/visibility_statute_mi>/)[1].replace(/[<,<\/]visibility_statute_mi>/g, ''))
        output += `Visibility: ${(t/1.151).toFixed(2)}nm (${(t*1.609).toFixed(2)}km)`
        console.log(output);
    });
});

process.on('uncaughtException', (err, origin) => {}); // Shut error