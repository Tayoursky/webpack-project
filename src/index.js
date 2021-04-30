import './styles/index.scss'

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
