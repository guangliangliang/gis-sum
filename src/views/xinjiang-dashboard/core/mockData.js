// 新绛县模拟数据
export const townNames = [
  '古交镇',
  '龙兴镇',
  '阳王镇',
  '泽掌镇',
  '三泉镇',
  '泉掌镇',
  '横桥镇',
  '万安镇',
  '北张镇'
]

// 乡镇基础数据
export const townData = [
  { name: '古交镇', population: 35000, area: 57.2, gdp: 12.5, lng: 111.143434, lat: 35.615750, address: '上院泽古线古交镇政府古交镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/ee85665e7efa1e52813f59f84bd2a3ee'] },
  { name: '龙兴镇', population: 85000, area: 72.5, gdp: 45.8, lng: 111.211985, lat: 35.612765, address: '新北建街与站北路交叉口西南60米', tel: '-', openTime: '周一至周五 09:00-17:00', photos: [] },
  { name: '阳王镇', population: 28000, area: 65.8, gdp: 8.6, lng: 111.118976, lat: 35.506770, address: '原阳王中心校', tel: '0359-7822403', openTime: '-', photos: [] },
  { name: '泽掌镇', population: 32000, area: 78.3, gdp: 15.2, lng: 111.162467, lat: 35.719596, address: '泽古线泽掌镇政府泽掌镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/d14ce60bf422ae29f285c8036a866d97'] },
  { name: '三泉镇', population: 42000, area: 85.6, gdp: 22.3, lng: 111.165988, lat: 35.676809, address: '三泉镇政府三泉镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/c34773d25d6b8d228b2414fc80459c0d'] },
  { name: '泉掌镇', population: 25000, area: 45.2, gdp: 7.8, lng: 111.110989, lat: 35.661744, address: '泉掌镇', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/2bad6cfee798361c9f2b4daffd764e12'] },
  { name: '横桥镇', population: 38000, area: 92.5, gdp: 18.5, lng: 111.230622, lat: 35.574739, address: '南马新北线横桥镇政府', tel: '-', openTime: '-', photos: ['http://store.is.autonavi.com/showpic/486334b4b3c28a0231f7a98bd1062dfa'] },
  { name: '万安镇', population: 30000, area: 62.3, gdp: 10.2, lng: 111.131800, lat: 35.539670, address: '万安镇新闻路', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/8b4ee5d266d4788ac5b70d1786347480'] },
  { name: '北张镇', population: 27000, area: 58.7, gdp: 9.5, lng: 111.112381, lat: 35.703976, address: '泽古线', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/e8069e283d7888546be335bc3408dbb0'] }
]

// 新绛县总体数据
export const countyOverview = {
  name: '新绛县',
  totalPopulation: 342000,
  totalArea: 598.1,
  gdp: 150.4,
  gdpGrowth: 6.8,
  adminTowns: 9,
  adminVillages: 220
}

// 学校点位数据
export const schoolPoints = [
  {
    "name": "新纺学校",
    "lng": 111.197015,
    "lat": 35.591464,
    "type": "school",
    "address": "顺城街293号",
    "tel": "-",
    "keytag": "教学楼",
    "photos": [
      "http://store.is.autonavi.com/showpic/677f170f77df0a279844d097dc5e45bf",
      "https://store.is.autonavi.com/showpic/5c3e18cb24b9b2bf121728c2ce7705ea",
      "http://store.is.autonavi.com/showpic/89f90190bc9730871d492eb26b7a1eed"
    ]
  },
  {
    "name": "海泉中学",
    "lng": 111.210933,
    "lat": 35.629541,
    "type": "middle",
    "address": "迎宾路与荀子路交叉口西160米",
    "tel": "0359-8791999",
    "keytag": "中学",
    "photos": [
      "https://aos-comment.amap.com/B0FFFEVRXR/comment/content_media_external_images_media_100000783_1742725372314_25203646.jpg",
      "https://aos-comment.amap.com/B0FFFEVRXR/comment/content_media_external_file_100003051_1761864146274_59967805.jpg",
      "https://aos-comment.amap.com/B0FFFEVRXR/comment/64054C8A_A3F6_4053_AF47_C7BF2FEA76D9_L0_001_2000_150_1757117118400_40883981.jpg"
    ]
  },
  {
    "name": "海泉学校(东校区)",
    "lng": 111.211794,
    "lat": 35.626832,
    "type": "middle",
    "address": "商品一条街",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/ba3b8ea22222f1a5fc500c2334011026",
      "http://store.is.autonavi.com/showpic/d3d4f808d3a6f6ffbfd85bcbfbf0b42a",
      "https://store.is.autonavi.com/showpic/d21a93c97ee5ee6e6803f2cddea680c6"
    ]
  },
  {
    "name": "新绛中学",
    "lng": 111.222277,
    "lat": 35.642085,
    "type": "middle",
    "address": "峨眉路附近",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/c0cf4f5e1de4f9b442fe63da0bfa291a",
      "http://store.is.autonavi.com/showpic/b53d488d44272a61bcfa88ccff68841e",
      "http://store.is.autonavi.com/showpic/395fe0f8ba5ba9927771b037d1e94a7f"
    ]
  },
  {
    "name": "海泉学校",
    "lng": 111.231487,
    "lat": 35.615132,
    "type": "middle",
    "address": "-",
    "tel": "-",
    "keytag": "中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/9e4579a4fa202782d4b2a19654aae91c",
      "http://store.is.autonavi.com/showpic/1704a4d3fb7f868c9f1fd0525576a6e7",
      "http://store.is.autonavi.com/showpic/1ece479a99b5312126508b525c25e640"
    ]
  },
  {
    "name": "海泉学校(西校区)",
    "lng": 111.206016,
    "lat": 35.630485,
    "type": "primary",
    "address": "荀子街与文体路交叉口西200米",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/a90768c671764bc7f77f4f0d8325e7e3",
      "http://store.is.autonavi.com/showpic/f1051148808b96df8a5153f4c4e5e9f8",
      "http://store.is.autonavi.com/showpic/579a306e8a5906fb0fa140fad31af1d6"
    ]
  },
  {
    "name": "新绛县第二中学",
    "lng": 111.202969,
    "lat": 35.628933,
    "type": "middle",
    "address": "学府花园旁边",
    "tel": "0359-7528703",
    "keytag": "初级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/74e492fe466fd1622460846fec174ed8",
      "https://store.is.autonavi.com/showpic/27c6db03a9c4920e3e716378d79a470a",
      "https://store.is.autonavi.com/showpic/9de6f7715668bcefe70bb7bfad6c94a9"
    ]
  },
  {
    "name": "新华学校",
    "lng": 111.216482,
    "lat": 35.61792,
    "type": "vocational",
    "address": "龙兴镇正平街95号",
    "tel": "13935965320",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/8d5e790246192bb6b6897eb8052ccd66",
      "http://store.is.autonavi.com/showpic/ee09f68007ce55600212ece654a8159b"
    ]
  },
  {
    "name": "礼乐园新华学校小学部",
    "lng": 111.220736,
    "lat": 35.620132,
    "type": "primary",
    "address": "内朝殿路49号",
    "tel": "0359-7526852",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/53e3a43c6fa838e3346fe82de683ab67",
      "http://store.is.autonavi.com/showpic/3d16f85f787c833217e2edae9d66497e",
      "http://store.is.autonavi.com/showpic/52cc773966b073ab60ba0da0731fdd58"
    ]
  },
  {
    "name": "龙兴中学",
    "lng": 111.206708,
    "lat": 35.623353,
    "type": "middle",
    "address": "新绛县文体路与011乡道交叉口南140米",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/cd90c7f40cb99b768f450c28062eb446"
    ]
  },
  {
    "name": "新绛县龙兴学校",
    "lng": 111.231711,
    "lat": 35.619113,
    "type": "vocational",
    "address": "东门街9号附近",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/998bdff1c1dae5cae03480983a6df285"
    ]
  },
  {
    "name": "西关学校",
    "lng": 111.211251,
    "lat": 35.613742,
    "type": "school",
    "address": "法院斜对面",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/27326c82531687476acf2efdff449ae4",
      "https://aos-comment.amap.com/B01670MV2Z/comment/content_media_external_file_100007158_1762498792679_78029572.jpg",
      "http://store.is.autonavi.com/showpic/d8a18043cd9c4a9de4bc7f40d8cc3568"
    ]
  },
  {
    "name": "新绛汾河中学",
    "lng": 111.244077,
    "lat": 35.599989,
    "type": "middle",
    "address": "108国道",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/33bf497958da0b0dcff3a0ca1336db1c"
    ]
  },
  {
    "name": "东街逸夫学校",
    "lng": 111.228658,
    "lat": 35.615354,
    "type": "middle",
    "address": "社区办新绛县东街",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/df77d207d332c60b1aaece7c62a7f5d8",
      "https://store.is.autonavi.com/showpic/fff422b936b38efbf77adfd2081e28dd"
    ]
  },
  {
    "name": "新绛县古交中学",
    "lng": 111.147261,
    "lat": 35.614252,
    "type": "middle",
    "address": "古交镇",
    "tel": "-",
    "keytag": "高级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/8e5315d3b727147234b6ef45320c82c8"
    ]
  },
  {
    "name": "育英学校",
    "lng": 111.184233,
    "lat": 35.681783,
    "type": "school",
    "address": "三泉镇三泉村路口",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/0601aafd46085e007c7885fac38b088a"
    ]
  },
  {
    "name": "新绛县希望学校",
    "lng": 111.20889,
    "lat": 35.626805,
    "type": "middle",
    "address": "龙兴镇庄儿头华新线希望学校",
    "tel": "-",
    "keytag": "中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/553dc2bd55a36572389e071200a97a2e"
    ]
  },
  {
    "name": "席村学校",
    "lng": 111.168858,
    "lat": 35.650168,
    "type": "middle",
    "address": "030乡道与039乡道交叉口西340米",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/0aef5aef97b17e32c5d2773130df9096"
    ]
  },
  {
    "name": "北张中学",
    "lng": 111.109685,
    "lat": 35.705286,
    "type": "middle",
    "address": "北张镇泽古线青少年业余体校",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/3db63a7093b35087179a5f926d5fc5db",
      "http://store.is.autonavi.com/showpic/eb6e1febc1d0574eed90503f8c8cec57"
    ]
  },
  {
    "name": "狄庄学校",
    "lng": 111.259254,
    "lat": 35.599636,
    "type": "primary",
    "address": "横桥镇108国道",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/3652b0e9abd0fdf9c968501abca6127d"
    ]
  },
  {
    "name": "新绛县东城学校",
    "lng": 111.237261,
    "lat": 35.6154,
    "type": "middle",
    "address": "东门街165号",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/0757489314c88c2400a2242ed7787325",
      "https://store.is.autonavi.com/showpic/f32ee6ad9f3dcb114ae445598e10e836",
      "https://store.is.autonavi.com/showpic/37983b5029112abca4ac0c0dcaf2c8f5"
    ]
  },
  {
    "name": "新绛县三泉镇三泉学校",
    "lng": 111.161058,
    "lat": 35.676164,
    "type": "primary",
    "address": "三泉镇三泉村",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "https://store.is.autonavi.com/showpic/0c15d032c5b0ee546e6efb74717745b2",
      "http://store.is.autonavi.com/showpic/1d062344801d3b18210858bb89f08d41",
      "http://store.is.autonavi.com/showpic/1424a2ce373a5baf4d2dc737ca9db712"
    ]
  },
  {
    "name": "新绛县特殊教育学校",
    "lng": 111.203776,
    "lat": 35.62376,
    "type": "school",
    "address": "教育局教研室",
    "tel": "-",
    "keytag": "特殊需求教育",
    "photos": [
      "http://store.is.autonavi.com/showpic/c407415e1e1dfe9ff106581f0f082932",
      "http://store.is.autonavi.com/showpic/5a08f2dc41db2473822072f8f4f9017e",
      "http://store.is.autonavi.com/showpic/e91c80697975212e96fead261dd7e381"
    ]
  },
  {
    "name": "万安学校",
    "lng": 111.136945,
    "lat": 35.542889,
    "type": "school",
    "address": "万安镇万安村",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/7fc474c73cabf7c87764d26c49897f53"
    ]
  },
  {
    "name": "新绛县北张学校",
    "lng": 111.11105,
    "lat": 35.707684,
    "type": "primary",
    "address": "北张镇泽古线北张示范小学",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/17a97790dc435f0ca54465ac35c62f8b",
      "http://store.is.autonavi.com/showpic/7cdc90b1bb1bda270885b3eb326e9d5b"
    ]
  },
  {
    "name": "新绛县三泉镇水西学校",
    "lng": 111.18662,
    "lat": 35.639211,
    "type": "school",
    "address": "039乡道南50米",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/10a537bb1664044e422f23df8b5e1cbd",
      "http://store.is.autonavi.com/showpic/9cd2725030246e38cc7ee63391450076",
      "http://store.is.autonavi.com/showpic/482d446a44c2162bfbe0940b62eb0d91"
    ]
  },
  {
    "name": "娄庄学校",
    "lng": 111.264938,
    "lat": 35.639796,
    "type": "school",
    "address": "龙兴镇娄庄村",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/cd3dd0997e865ea726563d1929dfd496"
    ]
  },
  {
    "name": "新绛县泉掌中学",
    "lng": 111.10793,
    "lat": 35.660052,
    "type": "middle",
    "address": "泉掌镇泽古线泉掌中学",
    "tel": "-",
    "keytag": "中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/e5ac31086c06415575edd799e27e5c35"
    ]
  },
  {
    "name": "南关学校",
    "lng": 111.228237,
    "lat": 35.601169,
    "type": "primary",
    "address": "南关村044号",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/f475524b71c7365087cc03f6dbabff8c"
    ]
  },
  {
    "name": "阳王中学",
    "lng": 111.127257,
    "lat": 35.508969,
    "type": "middle",
    "address": "阳王村",
    "tel": "-",
    "keytag": "中学",
    "photos": [
      "https://store.is.autonavi.com/showpic/b7aaede5dfa75dd80000002449864321"
    ]
  },
  {
    "name": "新绛县光村学校",
    "lng": 111.175739,
    "lat": 35.752984,
    "type": "school",
    "address": "清泽线与799县道交叉口北500米",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/cc3c69e126266d81e000926113c07182",
      "https://store.is.autonavi.com/showpic/7b79da44af82111c19d8c8a691f981d3"
    ]
  },
  {
    "name": "新绛县龙泉学校",
    "lng": 111.17043,
    "lat": 35.614517,
    "type": "school",
    "address": "古交镇",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/620b3ad3307fcfaa4d191f88d1bbe857"
    ]
  },
  {
    "name": "泽掌中学",
    "lng": 111.16649,
    "lat": 35.714746,
    "type": "middle",
    "address": "泽掌镇泽掌村",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/39b0d600405dff6f3e2957686386f835"
    ]
  },
  {
    "name": "新绛县古交镇周流学校",
    "lng": 111.112139,
    "lat": 35.600658,
    "type": "school",
    "address": "古交镇周流村",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/d190049f982b1b9b154d345da9778924"
    ]
  },
  {
    "name": "店头寄宿制学校",
    "lng": 111.279158,
    "lat": 35.668004,
    "type": "school",
    "address": "龙兴镇店头村店头",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/7d3c1e608a901b7f60f9849585c22da2",
      "http://store.is.autonavi.com/showpic/beb7d1af36049f42192b51625c4b9673",
      "http://store.is.autonavi.com/showpic/969adab063aeada902be7e2091409078"
    ]
  },
  {
    "name": "符村学校",
    "lng": 111.226492,
    "lat": 35.564668,
    "type": "school",
    "address": "横桥乡",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/aea0d1fb9677b2564496e2c4039d758e"
    ]
  },
  {
    "name": "北王马学校",
    "lng": 111.189321,
    "lat": 35.628704,
    "type": "school",
    "address": "-",
    "tel": "-",
    "keytag": "小学",
    "photos": []
  },
  {
    "name": "东薛郭学校",
    "lng": 111.127634,
    "lat": 35.642854,
    "type": "school",
    "address": "-",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/df2d8dbafbe8db349bf2dc48ccecf8ae"
    ]
  },
  {
    "name": "横桥中学",
    "lng": 111.231625,
    "lat": 35.575425,
    "type": "middle",
    "address": "临夏线1号",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/d8b5b5e7b2b4d022114969c139433b46"
    ]
  },
  {
    "name": "王村学校",
    "lng": 111.174278,
    "lat": 35.57568,
    "type": "school",
    "address": "古交镇",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://aos-cdn-image.amap.com/sns/ugccomment/a326b0cc-0424-499f-afd8-903814195d3a.jpg"
    ]
  },
  {
    "name": "新绛县新城幼儿园",
    "lng": 111.230975,
    "lat": 35.639275,
    "type": "school",
    "address": "绛州大道与市府大道交叉口北320米",
    "tel": "-",
    "keytag": "幼儿园",
    "photos": [
      "https://store.is.autonavi.com/showpic/c1a8d5b439a79bbde1d4793d535cdce8",
      "http://store.is.autonavi.com/showpic/bfb3d6dd7ec3fdd39e45e62150dd9399",
      "https://store.is.autonavi.com/showpic/94643a69c80c7e330000002478216063?type=pic"
    ]
  },
  {
    "name": "富力城幼儿园",
    "lng": 111.218164,
    "lat": 35.628532,
    "type": "school",
    "address": "荀子路与府西路交叉口西南180米",
    "tel": "13753992228",
    "keytag": "幼儿园",
    "photos": [
      "http://store.is.autonavi.com/showpic/f9b7026dbcc90fc41ff9c03f928b2e0f",
      "http://store.is.autonavi.com/showpic/8ed8dfd8a7eec91e284ad2ab084a6869",
      "http://store.is.autonavi.com/showpic/f798059df313ed4896081b88fca4c5b7"
    ]
  },
  {
    "name": "西庄学校",
    "lng": 111.116592,
    "lat": 35.728668,
    "type": "school",
    "address": "006乡道",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "http://store.is.autonavi.com/showpic/8cb3664569c79f21f795837540578155",
      "https://store.is.autonavi.com/showpic/c74707735c43d7100000002478264514?type=pic"
    ]
  },
  {
    "name": "南苏村学校",
    "lng": 111.165899,
    "lat": 35.592224,
    "type": "school",
    "address": "临夏线",
    "tel": "-",
    "keytag": "初级中学",
    "photos": [
      "http://store.is.autonavi.com/showpic/d12ffa0efe8320fcd64822dd06cc870e"
    ]
  },
  {
    "name": "乔沟头学校",
    "lng": 111.168134,
    "lat": 35.76961,
    "type": "school",
    "address": "泽掌镇",
    "tel": "-",
    "keytag": "小学",
    "photos": [
      "https://store.is.autonavi.com/showpic/74fdb5e5a15ac05c8e42c8b1062fd71b",
      "http://store.is.autonavi.com/showpic/42b0e6b4542e0de4c7e9a154bec836ac",
      "https://store.is.autonavi.com/showpic/69acd5c193a4a8362f0e71ad911ad2f9"
    ]
  },
  {
    "name": "新绛县第二幼儿园",
    "lng": 111.227451,
    "lat": 35.615068,
    "type": "school",
    "address": "桥北路45号",
    "tel": "-",
    "keytag": "幼儿园",
    "photos": [
      "https://store.is.autonavi.com/showpic/b0056ec263c751040000002187192869?type=pic",
      "https://store.is.autonavi.com/showpic/a7a29498445a957055ce20815263a2b9"
    ]
  },
  {
    "name": "新绛县幼儿园",
    "lng": 111.219742,
    "lat": 35.613386,
    "type": "school",
    "address": "西关路与新北建街交叉口东北120米",
    "tel": "-",
    "keytag": "幼儿园",
    "photos": [
      "http://store.is.autonavi.com/showpic/664028b2898c3359f84e6c535c63bd35"
    ]
  },
  {
    "name": "新纺幼儿园",
    "lng": 111.196986,
    "lat": 35.589163,
    "type": "school",
    "address": "-",
    "tel": "-",
    "keytag": "幼儿园",
    "photos": [
      "http://store.is.autonavi.com/showpic/25c78ac357a3c7975e4fd12d6b09c126",
      "http://store.is.autonavi.com/showpic/3db01685b8dcc990921a9da08d0ffc88",
      "http://store.is.autonavi.com/showpic/cacd0031dc7d18b97055c1d5f2a24d6f"
    ]
  },
  {
    "name": "老一中",
    "lng": 111.219825,
    "lat": 35.616975,
    "type": "middle",
    "address": "正平街与城壕路交叉口东120米",
    "tel": "-",
    "keytag": "中学",
    "photos": []
  },
  {
    "name": "星韵艺术培训学校",
    "lng": 111.21715,
    "lat": 35.62748,
    "type": "school",
    "address": "龙兴镇富力城步行街",
    "tel": "-",
    "keytag": "科教文化服务,科教文化场所,科教文化场所",
    "photos": [
      "http://store.is.autonavi.com/showpic/2d3373e9f35f5593b8c70c239a01eeb0"
    ]
  },
  {
    "name": "新绛县职业教育中心",
    "lng": 111.210178,
    "lat": 35.63061,
    "type": "vocational",
    "address": "新苏线与迎宾路交叉口西220米",
    "tel": "-",
    "keytag": "中等专业学校",
    "photos": [
      "http://store.is.autonavi.com/showpic/1d898a7ddc398eb53ceb4ca5518aab2f",
      "https://aos-comment.amap.com/B0FFFEW3QP/headerImg/2d2d4f9189eda065d1cacf2155b30fa9_2048_2048_80.jpg"
    ]
  },
  {
    "name": "新绛县职业教育中心西校区",
    "lng": 111.206125,
    "lat": 35.627797,
    "type": "vocational",
    "address": "文体路与荀子街交叉口西南260米",
    "tel": "-",
    "keytag": "职业高等学校",
    "photos": [
      "http://store.is.autonavi.com/showpic/5466e9131fe4fc29ede32e7453afd6b5",
      "http://store.is.autonavi.com/showpic/2e93f133b6a387c4ccf26ecee0d9d179",
      "http://store.is.autonavi.com/showpic/9005bea9d1906d07fb1a2ccccab77677"
    ]
  }
]
// 医院点位数据
export const hospitalPoints = [
  {
    "name": "新绛县人民医院",
    "lng": 111.220457,
    "lat": 35.631331,
    "level": "综合医院",
    "address": "043乡道附近",
    "tel": "0359-7523873",
    "openTime": "周一至周五 08:00-17:30；周六 08:00-12:00；周日 全天关闭",
    "photos": [
      "http://store.is.autonavi.com/showpic/d2be371ff94164824d34f1ae0af0a0f4",
      "https://store.is.autonavi.com/showpic/aa7b4bff01fe39de1804e2a02e779b16"
    ]
  },
  {
    "name": "新绛县中医院",
    "lng": 111.2185,
    "lat": 35.606579,
    "level": "综合医院",
    "address": "顺城街与站南路交叉口东420米",
    "tel": "0359-7522033",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/520ed4fb3f6c5074ec71a6fb60ecb7a4",
      "http://store.is.autonavi.com/showpic/61caf2c206ac45c0ae5954c3ec5cf813"
    ]
  },
  {
    "name": "下堡卫生院",
    "lng": 111.107228,
    "lat": 35.641461,
    "level": "卫生院",
    "address": "028乡道与014乡道交叉口西南220米",
    "tel": "-",
    "openTime": "-",
    "photos": []
  },
  {
    "name": "新绛民安医院",
    "lng": 111.216182,
    "lat": 35.627385,
    "level": "综合医院",
    "address": "富力城西苑西门南70米",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/a8258718aa40910494a4530ecaf77413",
      "https://store.is.autonavi.com/showpic/c3c56a850429eace721156492b70ffec"
    ]
  },
  {
    "name": "新绛县龙兴镇卫生院",
    "lng": 111.226326,
    "lat": 35.612363,
    "level": "卫生院",
    "address": "朝殿路49号绛州古城",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "https://store.is.autonavi.com/showpic/d457711bf75cb1d4d1fec1b9aa0edd33",
      "https://store.is.autonavi.com/showpic/e9228b5267fde8c69eed0398a8a2954e",
      "https://aos-comment.amap.com/B0FFJ20CTN/comment/202511_11-11462_1762832789138_66411555.jpg"
    ]
  },
  {
    "name": "新绛县三泉镇卫生院",
    "lng": 111.165528,
    "lat": 35.669381,
    "level": "卫生院",
    "address": "002乡道与039乡道交叉口北380米",
    "tel": "0359-7580515",
    "openTime": "周一至周日 08:00-12:00,14:00-18:00",
    "photos": [
      "https://store.is.autonavi.com/showpic/84a91da166f7b8dba08ce35dff04d5df",
      "http://store.is.autonavi.com/showpic/95538f13a4a4773deb332e78a6d3369d"
    ]
  },
  {
    "name": "新绛纺织厂医院",
    "lng": 111.202375,
    "lat": 35.59223,
    "level": "综合医院",
    "address": "108国道附近",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/d16471781866aafa3d4b0e56de7379c2"
    ]
  },
  {
    "name": "新绛南社卫生医院",
    "lng": 111.222303,
    "lat": 35.681727,
    "level": "卫生院",
    "address": "010乡道与801县道交叉口西南60米",
    "tel": "0359-7670105",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/e4fa93a44091ddd8a969452c95ac9eca",
      "http://store.is.autonavi.com/showpic/94bc522f725b550bd2d26fedc39e4fae",
      "http://store.is.autonavi.com/showpic/6381f1a5ac3146593dba9dc7cf6db3a6"
    ]
  },
  {
    "name": "新绛县医疗集团张镇北董村卫生所",
    "lng": 111.080997,
    "lat": 35.709008,
    "level": "卫生院",
    "address": "北张镇北董村",
    "tel": "13111292612",
    "openTime": "周一至周日 07:00-18:00",
    "photos": [
      "http://store.is.autonavi.com/showpic/d2be673e0fa61b6326bdfcd03338703f",
      "http://store.is.autonavi.com/showpic/b291c128f996de6550d3118c2c09cad9",
      "http://store.is.autonavi.com/showpic/d8facdf343a6ed002defac1eb8793aa3"
    ]
  },
  {
    "name": "新绛万安卫生院",
    "lng": 111.133937,
    "lat": 35.538499,
    "level": "卫生院",
    "address": "004乡道与临夏线交叉口西320米",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/f5234cfb13b240d3f6e115e25cd7e984"
    ]
  },
  {
    "name": "韩家庄村卫生室",
    "lng": 111.191677,
    "lat": 35.564823,
    "level": "卫生院",
    "address": "802县道",
    "tel": "13734295204",
    "openTime": "周一至周日 06:00-22:30",
    "photos": [
      "https://aos-comment.amap.com/B0HRV97RPP/headerImg/31947efded26f9d490d7e2a07a85d894_2048_2048_80.jpg"
    ]
  },
  {
    "name": "新绛县店头村卫生所",
    "lng": 111.280046,
    "lat": 35.667713,
    "level": "卫生院",
    "address": "龙兴镇店头村",
    "tel": "13033413429",
    "openTime": "周一至周日 07:30-21:30",
    "photos": [
      "http://store.is.autonavi.com/showpic/ffd880c65a024987d968a4942cf0394e",
      "http://store.is.autonavi.com/showpic/f8676a55f63ae64d1b7ddaa6efaad292",
      "http://store.is.autonavi.com/showpic/695f692958d289f0da2ed629aeb9cdcd"
    ]
  },
  {
    "name": "新绛县医疗集团阳王镇中心卫生院",
    "lng": 111.121905,
    "lat": 35.505814,
    "level": "卫生院",
    "address": "阳王镇南头临夏线阳王医院",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/c9885d58a2c287b18977d25f6f149306",
      "http://store.is.autonavi.com/showpic/9221e5892dc44a934408b08ef7b9f4d6",
      "http://store.is.autonavi.com/showpic/1ee44920af20de00fa58b995a5d56dcb"
    ]
  },
  {
    "name": "居园池社区卫生服务站",
    "lng": 111.218285,
    "lat": 35.62069,
    "level": "卫生院",
    "address": "城壕路55号",
    "tel": "13453913156;13453913256",
    "openTime": "周一至周日 08:30-20:00",
    "photos": [
      "http://store.is.autonavi.com/showpic/5e61ada95178c85ed13d17d73fe20e4c",
      "http://store.is.autonavi.com/showpic/0788715ebc835dc5b9c437d74e270c7e",
      "http://store.is.autonavi.com/showpic/48ac40e45855f5d73404b08d01502806"
    ]
  },
  {
    "name": "古交镇中心卫生院",
    "lng": 111.145993,
    "lat": 35.615711,
    "level": "卫生院",
    "address": "古交镇泽古线北(新绛县古交地税所附近)",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/aeb0c0fd9f26da768a14d932fb488f41"
    ]
  },
  {
    "name": "柳泉医院",
    "lng": 111.241591,
    "lat": 35.599961,
    "level": "综合医院",
    "address": "新绛开发区",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/5ec62bc4b0650968ec356a73aa998010"
    ]
  },
  {
    "name": "四府街社区卫生服务站",
    "lng": 111.230415,
    "lat": 35.616307,
    "level": "卫生院",
    "address": "四府社区信合小区门口",
    "tel": "13834475937",
    "openTime": "周一至周日 08:00-21:00",
    "photos": [
      "http://store.is.autonavi.com/showpic/1489ca1311a29c6b91d7feae94d26868"
    ]
  },
  {
    "name": "新绛县横桥中心卫生院",
    "lng": 111.230765,
    "lat": 35.575978,
    "level": "卫生院",
    "address": "802县道与025乡道交叉口西120米",
    "tel": "-",
    "openTime": "-",
    "photos": [
      "http://store.is.autonavi.com/showpic/db8cd26368771f2650cb3cf7b8657b04"
    ]
  },
  {
    "name": "新绛康养医院",
    "lng": 111.209087,
    "lat": 35.632739,
    "level": "综合医院",
    "address": "新绛县民政局院内",
    "tel": "-",
    "openTime": "周一至周日 00:00-24:00",
    "photos": [
      "https://store.is.autonavi.com/showpic/b4f1f2d3212abcc5a7811556963560e9",
      "https://store.is.autonavi.com/showpic/303c6da1df8cac04f342b5d09f7b0aba",
      "https://store.is.autonavi.com/showpic/80277edf5ed564d1447a89185f6ae6a0"
    ]
  },
  {
    "name": "三泉镇北李村卫生室",
    "lng": 111.173836,
    "lat": 35.65552,
    "level": "卫生院",
    "address": "002乡道",
    "tel": "13834103507",
    "openTime": "周一至周日 09:00-18:00",
    "photos": [
      "https://store.is.autonavi.com/showpic/7682c4bcabb0f0b4dca6fd29b2bf65c8"
    ]
  }
]
// 旅游景点数据
export const scenicPoints = [
  { lng: 111.20, lat: 35.62, name: '绛州大堂', level: '4A' },
  { lng: 111.19, lat: 35.61, name: '龙兴寺', level: '3A' },
  { lng: 111.21, lat: 35.60, name: '钟楼', level: '2A' },
  { lng: 111.18, lat: 35.63, name: '鼓乐广场', level: '3A' },
  { lng: 111.16, lat: 35.58, name: '光村遗址', level: '4A' },
  { lng: 111.22, lat: 35.59, name: '福胜寺', level: '3A' }
]

// 企业数据
export const enterprisePoints = [
  { lng: 111.25, lat: 35.61, name: '新绛煤化园区', type: 'industry' },
  { lng: 111.24, lat: 35.63, name: '化工产业园', type: 'industry' },
  { lng: 111.19, lat: 35.59, name: '农产品加工园', type: 'agriculture' },
  { lng: 111.23, lat: 35.62, name: '装备制造园', type: 'industry' },
  { lng: 111.17, lat: 35.62, name: '建材产业园', type: 'industry' }
]

// 农业示范基地
export const agriculturePoints = [
  { lng: 111.18, lat: 35.59, name: '蔬菜种植基地', type: 'vegetable' },
  { lng: 111.20, lat: 35.58, name: '果树种植园', type: 'fruit' },
  { lng: 111.16, lat: 35.61, name: '养殖示范区', type: 'livestock' },
  { lng: 111.22, lat: 35.60, name: '中药材种植园', type: 'herb' },
  { lng: 111.19, lat: 35.64, name: '粮食高产田', type: 'grain' }
]

// 美丽乡村示范村
export const beautifulVillages = [
  { lng: 111.17, lat: 35.60, name: '光村' },
  { lng: 111.21, lat: 35.59, name: '西庄村' },
  { lng: 111.19, lat: 35.64, name: '北张村' },
  { lng: 111.23, lat: 35.61, name: '桥东村' },
  { lng: 111.15, lat: 35.62, name: '泉掌村' }
]

// 经济数据
export const economicData = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  gdp: [105.2, 112.5, 120.8, 130.2, 141.5, 150.4],
  industry: {
    primary: [18.5, 19.2, 20.5, 21.8, 23.2, 24.5],
    secondary: [52.6, 56.3, 60.4, 65.1, 70.8, 75.2],
    tertiary: [34.1, 37.0, 39.9, 43.3, 47.5, 50.7]
  }
}

// 旅游数据
export const tourismData = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  visitors: [420, 180, 260, 350, 480, 520],
  revenue: [28, 12, 18, 25, 35, 38]
}

// 民生数据
export const livelihoodData = {
  schools: {
    high: 5,
    middle: 18,
    primary: 45,
    kindergarten: 62
  },
  hospitals: {
    level2: 2,
    level1: 15,
    clinics: 186
  },
  socialSecurity: {
    endowment: 185000,
    medical: 320000,
    unemployment: 45000
  }
}
