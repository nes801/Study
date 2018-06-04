import time
import requests
import re
from bs4 import BeautifulSoup

#検索結果の全ページから件数分のホテル詳細URLを配列で返す
def get_hotel_url(search_url):
    url_list=[]
    page_num=0
    while True:
        #ページ番号を付与してリクエスト投げる
        res=requests.get(search_url+'&page='+str(page_num))
        soup=BeautifulSoup(res.content,'html.parser')
        # print(page_num)

        #ページ内のホテル名ブロックを全て取得する
        for span in soup.find_all('span',class_='name'):
            #spanの中にaタグがあればURLを取得する
            if span.a != None:
                #URLのid部分以外は不要
                hotel_id=span.a.get("href").replace('../detail/detail_top.jsp?id=','')
                #ホテルの詳細を検索
                get_hotel_detail(hotel_id)
                time.sleep(3)

        time.sleep(3)
        #次ページが存在しなかったら
        if len(soup.find_all('a',string=">>")) == 0:
            print('終了だよ')
            break
        page_num+=1


def get_hotel_detail(hotel_id):
    res=requests.get('http://happyhotel.jp/detail/detail_top.jsp?id='+hotel_id)
    soup=BeautifulSoup(res.content,'html.parser')

    #ホテル名を取得
    hotel_name=soup.find(id='cHeader').find('h1').string;

    #'tr'かつクラスがstrongのみ（料金情報欄）抽出
    for tr in soup.find_all('tr',class_='strong'):
        #利用区分取得
        for th in tr.find_all('th'):
            use_kbn=th.text #利用区分
            # print (use_kbn)
            for d in tr.find_all(["dt","dd"]):
                line_array=d.text.split()
                #曜日は全部【】で囲われてるから判別できた
                if len(line_array) == 1:
                    #正規表現で【】を除外
                    week_kbn=re.sub(r'[【】]',"",line_array[0])
                    # print (week_kbn)
                else:
                    # print(line_array)  #['10:00〜13:00', 'チェックインより', '6時間ご利用', '¥6000', '〜¥12000']
                    #処理のため一旦配列結合して文字列にする
                    line=''.join(line_array)
                    #正規表現で全角文字を除外する
                    #空要素も削除する
                    line_array=[i for i in re.split(r'[^\x01-\x7E]',line) if i != '']
                    # print (line_array)
                    try:
                        start_time=line_array[0]
                        end_time=line_array[1]
                        stay_time=line_array[2]
                        min_price=line_array[3]
                        max_price=line_array[4]
                        print (hotel_id+','+hotel_name+','+use_kbn+','+week_kbn+','+
                            min_price+','+max_price+','+start_time+','+end_time+','+stay_time)
                    # もしデータ抽出で失敗したら，例外キャッチする
                    except:
                        print('エラー：'+hotel_id,line_array)
    # print('---------')

get_hotel_url('http://happyhotel.jp/searchHotelArea.act?area_id=999000131')
