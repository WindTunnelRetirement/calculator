// display = 結果表示用input
const display = document.getElementById('display');
// 全ボタンを取得
const buttons = document.querySelectorAll('button');
// =ボタン
const equals = document.getElementById('equals');
// Cボタン
const clear = document.getElementById('clear');

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


function inputNumber(num) {
  // 小数点の場合の特別処理
  if (num === ".") {

    const lastChar = display.value.slice(-1);

    // 入力が空 → "0." にする
    if (display.value === "") {
      display.value = "0.";
      return;
    }

    // 演算子の直後の "." → "0."
    if (["+", "-", "*", "/"].includes(lastChar)) {
      display.value += "0.";
      return;
    }

    // 現在の数字ブロックを取得（数字だけを後ろから取る）
    const match = display.value.match(/(\d+(\.\d*)?)$/);
    const lastNumberBlock = match ? match[0] : "";

    // **この数字ブロックに . がすでにある場合 → 追加しない**
    if (lastNumberBlock.includes(".")) {
      return; // .連打防止
    }
  }

  display.value += num;
}

function inputOperator(op) {
  // 最初が演算子なら無視
  if (display.value === '') return;

  const lastChar = display.value.slice(-1);

  // 連続演算子なら上書き (+ を - に変えるなど)
  if (["+", "-", "*", "/"].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + op;
    return;
  }

  display.value += op;
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function clearDisplay() {
  display.value = '';
}

function deleteOne() {
  display.value = display.value.slice(0, -1);
}


// キーボード入力対応
document.addEventListener("keydown", function(event) {
  if (0 <= event.key && event.key <= 9) {
    inputNumber(event.key);
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    inputOperator(event.key);
  } else if (event.key === "Enter") {
    calculate();
  } else if (event.key === "Escape") {
    clearDisplay();
  } else if (event.key === "Backspace") {
    deleteOne();
  }
});

buttons.forEach(button => {
  if (button !== equals && button !== clear) {
    button.addEventListener('click', () => {

      const v = button.dataset.value;

      // 数字か小数点なら inputNumber
      if ((v >= "0" && v <= "9") || v === ".") {
        inputNumber(v);
      } else {
        inputOperator(v);
      }

    });
  }
});

