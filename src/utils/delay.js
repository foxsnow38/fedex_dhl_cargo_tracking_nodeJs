export default function delay(delay) {
    return new Promise(function (resolve) { /// promise delay func learn promises
        setTimeout(resolve, delay);
    })}