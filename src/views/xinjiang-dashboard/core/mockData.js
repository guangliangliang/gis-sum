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
  { name: '古交镇', population: 35000, area: 57.2, gdp: 12.5, lng: 111.13728, lat: 35.615835, address: '上院泽古线古交镇政府古交镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/ee85665e7efa1e52813f59f84bd2a3ee'] },
  { name: '龙兴镇', population: 85000, area: 72.5, gdp: 45.8, lng: 111.205916, lat: 35.61297, address: '新北建街与站北路交叉口西南60米', tel: '-', openTime: '周一至周五 09:00-17:00', photos: [] },
  { name: '阳王镇', population: 28000, area: 65.8, gdp: 8.6, lng: 111.112818, lat: 35.506893, address: '原阳王中心校', tel: '0359-7822403', openTime: '-', photos: [] },
  { name: '泽掌镇', population: 32000, area: 78.3, gdp: 15.2, lng: 111.156325, lat: 35.719663, address: '泽古线泽掌镇政府泽掌镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/d14ce60bf422ae29f285c8036a866d97'] },
  { name: '三泉镇', population: 42000, area: 85.6, gdp: 22.3, lng: 111.159855, lat: 35.676902, address: '三泉镇政府三泉镇委', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/c34773d25d6b8d228b2414fc80459c0d'] },
  { name: '泉掌镇', population: 25000, area: 45.2, gdp: 7.8, lng: 111.104816, lat: 35.66177, address: '泉掌镇', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/2bad6cfee798361c9f2b4daffd764e12'] },
  { name: '横桥镇', population: 38000, area: 92.5, gdp: 18.5, lng: 111.224564, lat: 35.574984, address: '南马新北线横桥镇政府', tel: '-', openTime: '-', photos: ['http://store.is.autonavi.com/showpic/486334b4b3c28a0231f7a98bd1062dfa'] },
  { name: '万安镇', population: 30000, area: 62.3, gdp: 10.2, lng: 111.125644, lat: 35.539784, address: '万安镇新闻路', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/8b4ee5d266d4788ac5b70d1786347480'] },
  { name: '北张镇', population: 27000, area: 58.7, gdp: 9.5, lng: 111.106203, lat: 35.703983, address: '泽古线', tel: '-', openTime: '周一至周五 09:00-17:00', photos: ['http://store.is.autonavi.com/showpic/e8069e283d7888546be335bc3408dbb0'] }
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
    "lng": 111.190933,
    "lat": 35.591659,
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
    "lng": 111.204861,
    "lat": 35.629735,
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
    "lng": 111.205723,
    "lat": 35.627029,
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
    "lng": 111.21621,
    "lat": 35.642286,
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
    "lng": 111.225425,
    "lat": 35.615355,
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
    "lng": 111.19994,
    "lat": 35.630672,
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
    "lng": 111.19689,
    "lat": 35.629116,
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
    "lng": 111.210415,
    "lat": 35.618127,
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
    "lng": 111.214671,
    "lat": 35.620343,
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
    "lng": 111.200633,
    "lat": 35.623545,
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
    "lng": 111.225649,
    "lat": 35.619334,
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
    "lng": 111.205181,
    "lat": 35.613945,
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
    "lng": 111.238013,
    "lat": 35.600226,
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
    "lng": 111.222596,
    "lat": 35.615574,
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
    "lng": 111.141111,
    "lat": 35.614344,
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
    "lng": 111.178126,
    "lat": 35.681908,
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
    "lng": 111.202817,
    "lat": 35.626998,
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
    "lng": 111.162732,
    "lat": 35.65028,
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
    "lng": 111.103508,
    "lat": 35.705291,
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
    "lng": 111.253177,
    "lat": 35.599872,
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
    "lng": 111.231198,
    "lat": 35.615626,
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
    "lng": 111.154919,
    "lat": 35.676248,
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
    "lng": 111.197698,
    "lat": 35.623947,
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
    "lng": 111.130792,
    "lat": 35.543008,
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
    "lng": 111.104872,
    "lat": 35.707688,
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
    "lng": 111.18052,
    "lat": 35.639361,
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
    "lng": 111.258849,
    "lat": 35.640007,
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
    "lng": 111.101758,
    "lat": 35.660077,
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
    "lng": 111.222176,
    "lat": 35.601397,
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
    "lng": 111.121102,
    "lat": 35.509098,
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
    "lng": 111.169612,
    "lat": 35.753063,
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
    "lng": 111.16431,
    "lat": 35.614651,
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
    "lng": 111.160354,
    "lat": 35.714823,
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
    "lng": 111.105972,
    "lat": 35.600717,
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
    "lng": 111.273041,
    "lat": 35.668189,
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
    "lng": 111.220435,
    "lat": 35.564916,
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
    "lng": 111.183226,
    "lat": 35.628865,
    "type": "school",
    "address": "-",
    "tel": "-",
    "keytag": "小学",
    "photos": []
  },
  {
    "name": "东薛郭学校",
    "lng": 111.121465,
    "lat": 35.642903,
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
    "lng": 111.225567,
    "lat": 35.575671,
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
    "lng": 111.168168,
    "lat": 35.575843,
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
    "lng": 111.224911,
    "lat": 35.639484,
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
    "lng": 111.212097,
    "lat": 35.628735,
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
    "lng": 111.110411,
    "lat": 35.728667,
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
    "lng": 111.159775,
    "lat": 35.592362,
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
    "lng": 111.161995,
    "lat": 35.769668,
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
    "lng": 111.221389,
    "lat": 35.615288,
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
    "lng": 111.213677,
    "lat": 35.613599,
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
    "lng": 111.190905,
    "lat": 35.589359,
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
    "lng": 111.21376,
    "lat": 35.617186,
    "type": "middle",
    "address": "正平街与城壕路交叉口东120米",
    "tel": "-",
    "keytag": "中学",
    "photos": []
  },
  {
    "name": "星韵艺术培训学校",
    "lng": 111.211083,
    "lat": 35.627683,
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
    "lng": 111.204105,
    "lat": 35.630802,
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
    "lng": 111.200049,
    "lat": 35.627985,
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
    "lng": 111.214391,
    "lat": 35.631535,
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
    "lng": 111.212435,
    "lat": 35.606795,
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
    "lng": 111.101058,
    "lat": 35.641495,
    "level": "卫生院",
    "address": "028乡道与014乡道交叉口西南220米",
    "tel": "-",
    "openTime": "-",
    "photos": []
  },
  {
    "name": "新绛民安医院",
    "lng": 111.210114,
    "lat": 35.627587,
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
    "lng": 111.220264,
    "lat": 35.612583,
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
    "lng": 111.159396,
    "lat": 35.669477,
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
    "lng": 111.196299,
    "lat": 35.592433,
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
    "lng": 111.216232,
    "lat": 35.681908,
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
    "lng": 111.074851,
    "lat": 35.709015,
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
    "lng": 111.127783,
    "lat": 35.538617,
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
    "lng": 111.185592,
    "lat": 35.565025,
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
    "lng": 111.273927,
    "lat": 35.667897,
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
    "lng": 111.115748,
    "lat": 35.50594,
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
    "lng": 111.212219,
    "lat": 35.620898,
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
    "lng": 111.139841,
    "lat": 35.6158,
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
    "lng": 111.235529,
    "lat": 35.600197,
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
    "lng": 111.224353,
    "lat": 35.616528,
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
    "lng": 111.224707,
    "lat": 35.576223,
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
    "lng": 111.203013,
    "lat": 35.632929,
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
    "lng": 111.167717,
    "lat": 35.655638,
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
  { lng: 111.193919, lat: 35.620183, name: '绛州大堂', level: '4A' },
  { lng: 111.183908, lat: 35.610172, name: '龙兴寺', level: '3A' },
  { lng: 111.203931, lat: 35.600209, name: '钟楼', level: '2A' },
  { lng: 111.173892, lat: 35.630143, name: '鼓乐广场', level: '3A' },
  { lng: 111.153869, lat: 35.580134, name: '光村遗址', level: '4A' },
  { lng: 111.213938, lat: 35.590227, name: '福胜寺', level: '3A' }
]

// 企业数据
export const enterprisePoints = [
  { lng: 111.243931, lat: 35.610232, name: '新绛煤化园区', type: 'industry' },
  { lng: 111.233935, lat: 35.630219, name: '化工产业园', type: 'industry' },
  { lng: 111.18391, lat: 35.590184, name: '农产品加工园', type: 'agriculture' },
  { lng: 111.223938, lat: 35.620219, name: '装备制造园', type: 'industry' },
  { lng: 111.163879, lat: 35.62013, name: '建材产业园', type: 'industry' }
]

// 农业示范基地
export const agriculturePoints = [
  { lng: 111.173897, lat: 35.590165, name: '蔬菜种植基地', type: 'vegetable' },
  { lng: 111.193923, lat: 35.580206, name: '果树种植园', type: 'fruit' },
  { lng: 111.153866, lat: 35.610117, name: '养殖示范区', type: 'livestock' },
  { lng: 111.213937, lat: 35.600221, name: '中药材种植园', type: 'herb' },
  { lng: 111.183905, lat: 35.640156, name: '粮食高产田', type: 'grain' }
]

// 美丽乡村示范村
export const beautifulVillages = [
  { lng: 111.163881, lat: 35.600141, name: '光村' },
  { lng: 111.203932, lat: 35.590215, name: '西庄村' },
  { lng: 111.183905, lat: 35.640156, name: '北张村' },
  { lng: 111.223939, lat: 35.610224, name: '桥东村' },
  { lng: 111.143852, lat: 35.620094, name: '泉掌村' }
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
