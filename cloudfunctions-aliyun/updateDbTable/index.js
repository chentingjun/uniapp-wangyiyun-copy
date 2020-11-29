'use strict';
const Mock = require('hello-mock')
const db = uniCloud.database()
const getAllList = require('get-all-list')

// 头像
const avatarList = [
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302190535&di=cf26df2e2ea6092dfe47f9f1aaaaf81b&imgtype=0&src=http%3A%2F%2Fdiy.qqjay.com%2Fu%2Ffiles%2F2012%2F0217%2F31241e407e76134dab98e0aa5e0ccabd.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606301316671&di=a46889d60bc1a4b053a6d8de6460b08a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F10%2F20170610192627_yhAMN.thumb.700_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302224750&di=e2c44cf9b297c57308887ba180e82fc8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F01%2F20180901190625_wmpeq.thumb.700_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302232683&di=a7c88de2de6212ef8bbc123a285577b3&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190115%2F87868f21befc4e7f9007aa71efa79621.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302242099&di=39865eb88dafc624fcf0b43c08ddc2d5&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F19%2F20190119231949_buetu.jpg',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3023806798,280362912&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255042&di=35f17f6b288d5c7a3ae0205ef69967f2&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F19%2F20150919143903_UcJyE.thumb.700_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302264207&di=8fd7ca51665522f95a72d6050b86bc3f&imgtype=0&src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F9702170888%2F1000.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255041&di=fe9222fc3db22551d65f30780fda04b0&imgtype=0&src=http%3A%2F%2Fa-ssl.duitang.com%2Fuploads%2Fitem%2F201811%2F09%2F20181109151949_nidra.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255040&di=227eb719aad9222bcfebb69a23f6caf7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F14%2F20151114125314_jB5d8.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255040&di=d96cd4a25a6c0cb0af44358e64e6f32e&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F23%2F20170323214809_QKXr4.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255039&di=b4960ed7611bf1a62c7880036403fcfc&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F416%2Fw640h576%2F20181210%2F-3gH-hprknvu0779377.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255039&di=0397846d4a6788382f5de68dfbf59250&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F29%2F20141129194517_5Z2Lu.png',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255038&di=8b419c746ee710bd7e3a8056a2abb579&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa9d3fd1f4134970ae0c4fa7093cad1c8a7865d3e.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255038&di=0623d5b22f818bcbe8e917e1ebaf644b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F24%2F20181024133921_wlvbo.thumb.700_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255037&di=1760005469eb3722d07a6c6c3ba2bd62&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F20%2F20150920105348_38Ewf.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255037&di=1cd771cd590516c182fcbdcd3763ab28&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Debf046a4753e6709be0045f70bc69fb8%2F2e31d609b3de9c829d2e430c6681800a18d84357.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302311129&di=4b056b5fae4ddcef09ae32ee80bd60c0&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3Dba5a5248a0014c08193b28ad3a7a025b%2Fb00db07eca8065385fa97bf29edda144ac3482aa.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3222454269,3484359568&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255035&di=e6fc1291c5e8ca10acf87e9ad29fe093&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20181018%2F13%2F1539840433-HqTDGlFVxW.png',
  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1442342147,4215676959&fm=26&gp=0.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302328424&di=2dc316072b5164f3c39b705a5c10017f&imgtype=0&src=http%3A%2F%2Fwww.qqbeifen.com%2Fuploads%2Fallimg%2Fc161122%2F14om6233e010-52de.jpg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255032&di=46d270b8725875f2eb8d401b0f6eb1c1&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202002%2F28%2F20200228220532_uNjXc.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255031&di=eacdde143d50a3b3bf9a423e6e2d2f02&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F24%2F20200724072125_kevym.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255031&di=6655b718e4bbffac394f11fbe68be723&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F23%2F20200723090549_wdhgx.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255030&di=6f8c3b89d6124f710b94ea093dbb2a8d&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202007%2F31%2F20200731185216_NUScf.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302255029&di=7b52e70c102c90275a46881f41182673&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F22%2F20200622133909_rftue.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302320296&di=7d12a7d53749110461fbdc3f8bae939a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201903%2F03%2F20190303202941_iohxr.thumb.400_0.jpeg',
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606302320295&di=3a96b32fad72d0f5c0d1d8fef56c70a8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201901%2F17%2F20190117230425_eofqv.thumb.700_0.jpg',
]

async function makeMusicData(ids) {
  const promiseList = ids.map(async musicId => {
    const { commentlist } = Mock.mock({
      'commentlist|15-50': [{
        musicId,
        vipLevel: '@natural(0, 10)',
        name: '@cname',
        createTime: '@datetime(2020-MM-dd HH:mm:ss)',
        goodsNum: '@natural(0, 1000)',
        content: '@cparagraph(1, 4)',
      }]
    })
    commentlist.forEach(item => {
      const index = Mock.mock(`@natural(0, ${avatarList.length - 1})`)
      item.avatar = avatarList[index]
    })
    const collection = db.collection('music-comments')
    await collection.add(commentlist)
    return musicId
  })
  
  const res = await Promise.all(promiseList)
  return res
}

exports.main = async (event, context) => {
  //event为客户端上传的参数
  const list = await getAllList('music-list-for-ximalaya', 0, 50)
  const ids = list.map(item => item._id)
  const res = await makeMusicData(ids)
  //返回数据给客户端
  return res
};
