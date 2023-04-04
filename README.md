# SycnCalendar_MultiGoogleCalendar

Concept:
業務用で複数のGoogleAccountを使用しているとき、
それぞれのカレンダーをSyncするために作成したGASAPI


How to Use:

Sciptを作成
1-1. PrimaryとなるGoogleAccountで、GoogleDriveに接続
1-2. GASのSciptファイルを作成して、code.jsの中身をPaste


変数を置き換える
2-1. SyncさせたいEmailのListで格納する

let primaryEmail = ["you@expample.com"] //詳細も含めて表示する個人用のアカウント
let noAuthEmail = ["you@expample.com"] //外部に編集権限を付与できないアカウント
let otherEmails = ["you@expample.com"] //その他、Syncするアカウント

2-2. 今から何日後までの予定をSyncさせるか決める
let syncDays = 30 //同期する日数

Syncするすべてのカレンダーを変更できる権限を付与する
3-1. Syncさせたいすべてのアカウントで、Calendar.google.comに接続する
3-2. PrimaryAccountに対して、変更権限を付与して共有する

PrimaryCalendarでSyncさせるすべてのカレンダーを追加
4-1. 他のカレンダーを追加で、他のカレンダーをすべて追加する

Scriptを実行する
