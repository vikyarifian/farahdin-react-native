export async function translate(text:string, from:string, to:string) {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dj=1&dt=t&ie=UTF-8&q=${text.replaceAll('&',(from==='id'?'dan':'and'))}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    let content: string[] = []
    data.sentences.forEach((a:any) => {
        content.push(a.trans)
    });
    return content;
}