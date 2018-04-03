import requests
from bs4 import BeautifulSoup


res=requests.get('http://happyhotel.jp/detail/detail_top.jsp?id=543440')
soup=BeautifulSoup(res.content,'html.parser')

#dd.stringを使うと入れ子になってるサービスタイムと設備がNoneになる

#'tr'かつクラスがstrongのみ（料金情報欄）抽出
for tr in soup.find_all('tr',class_='strong'):
    #利用分類取得
    for th in tr.find_all('th'):
        print(th.text)
        for d in tr.find_all(["dt","dd"]):
            #曜日は全部【】で囲われてるから判別できそう
            print(''.join(d.text.split()))

    print('---------')
