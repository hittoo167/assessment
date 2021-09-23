'use strict';
const userNameInput = document.getElementById('username');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する
 * @param {HTMLElement} 
 */

function removeAllChildren(element){
    while (element.firstChild) {

        element.removeChild(element.firstChild);
        
    }
}

assessmentButton.onclick=()=>{
    const userName=userNameInput.value;
    if (userName.length===0) {
        return;
        
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あんさんのええとこ') + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = 'Tweet #あんさんのええとこ';
    tweetDivided.appendChild(anchor);
    //widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
    //<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
};


userNameInput.onkeydown=event=>{
    if(event.key==='Enter'){
        assessmentButton.onclick();
    }
};
const answers = [
    '{userName}のいいところは声です。',
    '{userName}のいいところはまなざしです。',
    '{userName}のいいところは情熱です。',
    '{userName}のいいところは厳しさです。',
    '{userName}のいいところは知識です。',
    '{userName}のいいところはユニークさです。',
    '{userName}のいいところは用心深さです。',
    '{userName}のいいところは見た目です。',
    '{userName}のいいところは決断力です。',
    '{userName}のいいところは思いやりです。',
    '{userName}のいいところは感受性です。',
    '{userName}のいいところは節度です。',
    '{userName}のいいところは好奇心です。',
    '{userName}のいいところは気配りです。',
    '{userName}のいいところはその全てです。',
    '{userName}のいいところは自制心です。',

];
/**
 * 名前の文字列を渡すと診断結果を返す関数。
 * @param{string}userNameユーザの名前
 * @return{string}診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し上げる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;


}
//テストコード
console.assert(
    assessment('太郎')==='太郎のいいところは決断力です。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎')===assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);

