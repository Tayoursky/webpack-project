import './styles/index.scss'


async function start() {
    return await Promise.resolve('async is working')
}
start().then(console.log)

class Other {
    static id = Date.now()
}

console.log(Other.id)

const primer = {
    first: 2,
    second: 1,
    third: 4
}

const primer2 = {
    ...primer,
    four: 5,
    fifth: 6
}
console.log(primer)
console.log(primer2)
