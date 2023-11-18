//変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let mistypedCount = 0;
//必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//複数のテキストを格納する配列
const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
]

// ランダムなテキストを表示
const createText = () => {
    // 正タイプした文字列をクリア
    typed = '';
    // typedfield変数のテキスト内容変数にtypedの''を代入
    typedfield.textContent = typed;

    //Math.randomで小数点数字をランダムで取得しMath.floorで整数にし、
    // 配列内のインデックスを取得しrandom変数に代入する
    //lengthとはインスタンスのデータのプロパティで配列の要素の数のことをいう
    let random = Math.floor(Math.random() * textLists.length);
    //配列からランダムにテキストを取得し画面に表示する
    //untyped変数にtextLists配列からランダムインデックスを代入する
    untyped = textLists[random];

    //textContentは　Nodeのプロパティでuntypedfieldにuntypedを書き込む
    untypedfield.textContent = untyped;
};
// webページ上のボタンをクリックしたり、
// キーボードでキーを入力したりすることを「イベント」という
//これらのイベントをきっかけに開始する処理のことを「イベントリスナー」という
// この際イベントリスナーに対応づけるaddEventListener()メソッドを利用
// 今回はキー入力（keypressイベント)をきっかけに関数keypressを呼び出す
// イベントオブジェクトの種類：click mousedown mouseup mousemove
//  keypress submit foucus scroll
// イベントオブジェクトは、発生したイベントの詳細情報を持つオブジェクトです。
// イベントオブジェクトは引数としてイベントハンドラーに渡されます。
// イベントとは、「ボタンがクリックされた」「キーボードのキーが押された」など、
// ウェブページで起こる出来事のことですね。
// イベントハンドラーは、イベントが発生したときに実行される関数です。
// 関数の（）はパラメータを入力しKeypressの場合はEventの省略したeを書いている
// パラメータはなんでもいい。

// 上の関数を呼び出し
// createText();



// キー入力の判定　
// キー判定には、e.keyをつかう
// Keypressイベントにて、入力されたものをKeyPress関数でコンソールに表示する
const keyPress = e => {

    // 誤タイプの場合
    // !==は「不等価演算子」で値が違うか型が違ってもture　
    // substringメソッドについてstr.substring(開始位置,終了位置);
    //ex)const str ='イチゴバナナ';
    //   const result=str.substring(0,3);
    //   console.log(str) →　出力：イチゴ
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped');

        mistypedCount++;
        // 具体的には、wrap.classList を使って wrap 要素のクラスにアクセスし、
        // その後に add メソッドや remove メソッドなどを使ってクラスの追加や削除などの変更
        // もし押されたキーが、untyped 変数の先頭の文字と一致しない場合、
        // wrap 要素に mistyped クラスを追加します。

        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);
        return;

    }


    //正タイプの場合

    score++;
    // typed 変数に untyped の先頭の文字を追加し、
    typed += untyped.substring(0, 1);

    // untyped 変数からは先頭の文字を削除します。（実際は2文字目から代入しなおしている）
    untyped = untyped.substring(1);
    // typedfield 要素と untypedfield 要素のテキストコンテンツを更新します。
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // テキストがなくなったら新しいテキストを表示
    if (untyped === '') {
        createText();
    }

};

// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if (score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBです。\nAランクまであと${100 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAです。\nSランクまであと${100 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSです。\nおめでとうございます!`;

    }
    // スコアの値を返す
    return `${score}文字打てました!\nミスタイピングは${mistypedCount}回でした!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// // ゲームを終了
// const gameOver = id => {

//     clearInterval(id);


//     const result = confirm(rankCheck(score));
//     // OKボタンをクリックされたらリロードする
//     if (result == true) {
//         window.location.reload();
//     }
//     else {
//         // キャンセルが選択された場合
//         untypedfield.textContent = 'お疲れ様でした!よく頑張りましたね!!';
//     }
// };

// // カウントダウンタイマー
// const timer = () => {
//     // タイマー部分のHTML要素（ｐ要素）を取得する
//     let time = count.textContent;
//     let timeUp = false; 
//     const id = setInterval(() => {

//         // カウントダウンする
//         time--;
//         count.textContent = time;

//         //カウントが0になったらタイマーを停止する
//         if (time <= 0) { 

//             clearInterval(id);

//             gameOver(id)

//         };
//     }, 1000);
//  if (timeUp) {
//         setTimeout(() => {
//             untypedfield.textContent = 'タイムアップです！';
//         }, 1000); // 1000ms（1秒）後にメッセージを表示
//     }

// };


// // ゲームスタート時の処理
// start.addEventListener('click', () => {

//     // カウントダウンタイマーを開始する
//     timer();
//     // ランダムなテキストを表示する
//     createText();
//     // 「スタート」ボタンを非表示にする
//     start.style.display = 'none';
//     // キーボードのイベント処理
//     document.addEventListener('keypress', keyPress);

// });
// untypedfield.textContent = 'スタートボタンで開始';

// カウントダウンタイマー
const timer = () => {
    let time = count.textContent;
    let timeUp = false;

    const id = setInterval(() => {
        time--;

        if (time <= 0) {
            clearInterval(id);
            timeUp = true;
            // タイマーが0になったときにゲームオーバー処理を呼び出す
            gameOver(id, timeUp);
        }

        count.textContent = time;
    }, 1000);
};

// ゲームを終了
const gameOver = (id, timeUp) => {
    clearInterval(id);

    if (timeUp === true) {
        // タイムアップのメッセージを表示する
        untypedfield.textContent = 'TIME UP！';
        // count 要素に red クラスを追加して赤く表示する
        count.classList.add('red');

        setTimeout(() => {
            // タイムアップ後にランク判定などのメッセージを表示
            const result = confirm(rankCheck(score));
            // OKボタンをクリックされたらリロードする
            if (result == true) {
                window.location.reload();
            } else {
                // キャンセルが選択された場合
                typedfield.textContent = ''; 
                untypedfield.textContent = `お疲れ様でした!!`;
                count.textContent = `継続は力なり!!`;

            
            }
        }, 1000); // 1000ms（1秒）後にメッセージを表示
    }
};

// ゲームスタート時の処理
start.addEventListener('click', () => {
    // カウントダウンタイマーを開始する
    timer();
    // ランダムなテキストを表示する
    createText();
    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';
    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = '毎日やれば必ず上達します!!';
