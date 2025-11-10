// display = 結果表示用input
const display = document.getElementById('display');
// 全ボタンを取得
const buttons = document.querySelectorAll('button');
// =ボタン
const equals = document.getElementById('equals');
// Cボタン
const clear = document.getElementById('clear');

// 数字・演算ボタンを押したとき
buttons.forEach(button => {
  if (button !== equals && button !== clear) {
    button.addEventListener('click', () => {
        // displayに押した値を追加
      display.value += button.dataset.value;
    });
  }
});

// =ボタンを押したとき
equals.addEventListener('click', () => {
  try {
    // evalで計算結果を表示
    display.value = eval(display.value);
  } catch {
    display.value = "Error"; // 計算エラー時
  }
});

// Cボタンを押したとき
clear.addEventListener('click', () => {
  display.value = '';
});