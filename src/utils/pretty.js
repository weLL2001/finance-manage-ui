
export default function pretty(promise){
    // 中间层处理，错误参数优先
    return promise.then(res => {
        return [undefined,res]
    })//处理以后fullfield
    .catch( err => {
        return [err,undefined]
    })//处理以后fullfield
}