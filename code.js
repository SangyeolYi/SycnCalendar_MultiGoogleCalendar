let primaryEmail = ["you@expample.com"] //イベンの詳細も含めて表示する個人用のアカウント
let noAuthEmail = ["you@expample.com"] //外部に編集権限を付与できないアカウント
let otherEmails = ["you@expample.com"] //その他、Syncするアカウント
let myEmails = primaryEmail.concat(noAuthEmail).concat(otherEmails)

function syncCalendars(){
  myEmails.forEach(e=>{
    if(noAuthEmail.includes(e)) return
    crudEvents(e)
  })
}

function crudEvents(emailA) {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setDate(startDate.getDate() + 30); // 例: 30日後
  var calendarA = CalendarApp.getCalendarById(emailA);
  var eventsA = calendarA.getEvents(startDate, endDate);
  
  for(let i = 0; i < myEmails.length; i++){
    let emailB = myEmails[i]
    let addressB = emailB.split("@")[0]
    if(emailA === emailB) continue //自分のメールは処理スキップ

    var calendarB = CalendarApp.getCalendarById(emailB);
    var eventsB = calendarB.getEvents(startDate, endDate);
    let exist = []
    let originalB = []
  console.log(emailB)
    eventsB.forEach(e=>{
      let title = e.getTitle()
      if(!title.includes("Blocked by")){//自分のオリジナルのイベントのみ抽出
        originalB.push(e)
      }
    })

    eventsA.forEach(e=>{
      let title = e.getTitle()
      if(title.includes(addressB)){
        exist.push(e)
      }      
    })

    exist.forEach(e=>{
      let code1 = e.getDescription()
      let existFlg = false
      originalB.forEach(f=>{
        let code2 = `${f.getId()}_${Utilities.formatDate(f.getStartTime(), "JST", "yyyy-MM-dd")}`
        if(code1.includes(code2)) existFlg = true
      })
      if(!existFlg){
        console.log(e.getTitle())
        e.deleteEvent();
      }
    })


    originalB.forEach(e=>{
      let title = e.getTitle()
      let eventId = e.getId()
      let st = e.getStartTime()
      let et = e.getEndTime()
      let date = Utilities.formatDate(st, "JST", "yyyy-MM-dd")
      let existFlg = false
      let code = `${eventId}_${date}`

      eventsA.forEach(f=>{
        let desc = f.getDescription()
        if(desc.includes(code)){ //詳細にEIDの記載がある＆日付が一緒の場合同一イベント、RecurrentEventはEIDが同じであるため、日付を掛け合わせる必要がある
          existFlg = true
          if(f.getStartTime()!== st || f.getEndTime()!== et) f.setTime(st,et) //時間が違う場合は更新
        }
      })

      if(!existFlg){ //存在しない場合、作成する
        
        if(emailA === primaryEmail){ 
          let guests = e.getGuestList()
          let eTitle = `${title}_Blocked by_${addressB}`
          options = {
            location: e.getLocation(),
            description: guests + "<br>" + e.getDescription() + "<br>" + code
          };
          calendarA.createEvent(eTitle, st, et, options)
          console.log("inset",eTitle)
        }else{
          let eTitle = `Blocked by ${addressB}`
          let options = {
            description: code
          };
          console.log("inset",eTitle)
          calendarA.createEvent(eTitle, st, et, options)
        }
        
      }
    })
  }


}

