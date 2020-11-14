const API = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次。';

function draw(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', API, true);
  // eslint-disable-next-line func-names
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data;
      try {
        data = JSON.parse(request.response);
      } catch (error) {
        callback(errorMessage);
        return;
      }
      if (!data.prize) {
        callback(errorMessage);
        return;
      }
      callback(null, data);
    } else {
      callback(errorMessage);
    }
  };
  // eslint-disable-next-line func-names
  request.onerror = function () {
    callback(errorMessage);
  };
  request.send();
}
document.querySelector('main').addEventListener('click', () => {
  draw((error, data) => {
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error);
      return;
    }
    const prizes = {
      FIRST: {
        className: 'jackpot',
        text: '恭喜你中頭獎了！日本東京來回雙人遊！',
      },
      SECOND: {
        className: 'second',
        text: '二獎！90 吋電視一台！',
      },
      THIRD: {
        className: 'third',
        text: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
      },
      NONE: {
        className: 'none',
        text: '銘謝惠顧',
      },
    };
    const { className, text } = prizes[data.prize];
    document.querySelector('.windows').classList.add('hide');
    document.querySelector('.result').classList.remove('hide');
    document.querySelector('.result').classList.add(className);
    document.querySelector('.result__text').innerText = text;
  });
});

/* 自己的寫法
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
  const response = request.responseText;
  const json = JSON.parse(response);
  document.querySelector('main').addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
      document.querySelector('.windows').classList.add('hide');
      document.querySelector('.result').classList.remove('hide');
      let className
      let text
      switch (json['prize']) {
        case "FIRST":
          className = 'jackpot';
          text = '恭喜你中頭獎了！日本東京來回雙人遊！';
          break;
        case "SECOND":
          className = 'second';
          text = '二獎！90 吋電視一台！';
          break;
        case "THIRD":
          className = 'third';
          text = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
          break;
        case "NONE":
          className = 'none';
          text = '銘謝惠顧';
          break;
        default:
          alert(errorMessage);
          break;
      }
        document.querySelector('.result').classList.add(className);
        document.querySelector('.result__text').innerText = text;
    }
  })
} else {
  alert(errorMessage);
}
};

request.send();
*/
