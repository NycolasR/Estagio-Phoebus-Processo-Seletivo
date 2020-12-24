var versionA = "1.5.4.0";
var versionB = "1.5.4.0";

console.log(compareVersion(versionA, versionB));

function compareVersion(versionA, versionB) {
    if(versionA < versionB) {
        return -1;
    } else if(versionA > versionB) {
        return 1;
    } else { // versionA == versionB -> modo gráfico
        return 0;
    }
}