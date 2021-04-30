import '../styles/index.scss'

function createFunction(){
    let counter = 0
    let destroy: boolean = false

    const listener  = (): number => counter++

    return {
        destroy() {
            document.addEventListener('click', listener)
            destroy = true
        },
        getClicks() {
            if (destroy) {
                return `Anal is destroy. Total clicks = ${counter}`
            }
            return counter
        }
    }
}
window['analytics'] =  createFunction()