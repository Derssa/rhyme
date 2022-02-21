function number(n) {
    if (n % 2 !== 0 && n % 11 !== 0 && n % 22 !== 0) {
        console.log(n);
        return;
    }
    if (n % 2 === 0) {
        console.log("candy");
    }
    if (n % 11 === 0) {
        console.log("bar");
    }
    if (n % 22 === 0) {
        console.log("candybar");
    }
}
number(22);
