const btn = document.querySelector('#ev_send_button_img');
const ipt = document.querySelector('#ev_send_text');
cbf3 = ([one]) => {
    const suffix = ['对不对？', '好不好？', '那就这样吧！', '思密达！！！'];
    const prefix = ['是的，', 'ok，', '好吧，', 'bingo'];
    if(one.target.className==='ev_zo_msg'){
        const recvString = one.target.innerText
        console.log(`>>>>>> 收到消息 "${recvString}"`);
        const genRespMsg = () => {
            if(recvString.length === 1) return '要不我们聊聊别的吧？你先说';
            const genIndex = () => Math.ceil(Math.random()*1000 % recvString.length);
            const [startIndex,endIndex] = [genIndex(),genIndex()].sort();
            console.log('截取片段索引',startIndex, endIndex);
            let responseMessage = `${recvString.substring(startIndex,endIndex)}`;
            if(recvString.length > 3 && endIndex-startIndex < 3) {
                return genRespMsg()
            }else if (endIndex-startIndex < 5){
                const genNumLessThan3 = () => Math.floor(Math.random()*1000 % 3);
                return `${prefix[genNumLessThan3()]} ${responseMessage}, ${suffix[genNumLessThan3()]}`
            }
            return responseMessage;
        }
        let respMsg = genRespMsg();
        console.log(`<<<<< 将要回复消息, ${respMsg}`);
        setTimeout(() => {ipt.value = `${respMsg}`;
        btn.click()}, 2000);
    }
}
let ob3;
ob3 && ob3.disconnect && ob3.disconnect();
ob3 = new MutationObserver(cbf3);
ob3.observe(document.querySelector('#ev_default_talk'), {characterDataOldValue: true, characterData: true, subtree: true, childList: true})
