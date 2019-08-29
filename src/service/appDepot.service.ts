import {Injectable} from '@angular/core';
import {App} from '../model/app';
import {GradientColor} from '../model/gradientColor';
import {Hero} from '../model/hero';
import {Categories, Category} from '../model/category';
import {ApiService} from './api.service';
import {HttpCallback} from '../model/httpCallback';

@Injectable()
export class AppDepotService {
  rawCategories = {
    language: {en: 'LANGUAGE', cn: '语言类'},
    anv: {en: 'AUDIO & VIDEO', cn: '影音类'},
    about: {en: 'ABOUT', cn: '关于'},
  };
  // categoryDict: Categories;
  categories: Array<Category>;

  // tslint:disable-next-line:max-line-length
  heroes: Array<Hero> = [{star: '天魁星', hero: '宋江', nickname: '呼保义'}, {star: '天罡星', hero: '卢俊义', nickname: '玉麒麟'}, {star: '天机星', hero: '吴用', nickname: '智多星'}, {star: '天闲星', hero: '公孙胜', nickname: '入云龙'}, {star: '天勇星', hero: '关胜', nickname: '大刀'}, {star: '天雄星', hero: '林冲', nickname: '豹子头'}, {star: '天猛星', hero: '秦明', nickname: '霹雳火'}, {star: '天威星', hero: '呼延灼', nickname: '双鞭'}, {star: '天英星', hero: '花荣', nickname: '小李广'}, {star: '天贵星', hero: '柴进', nickname: '小旋风'}, {star: '天富星', hero: '李应', nickname: '扑天雕'}, {star: '天满星', hero: '朱仝', nickname: '美髯公'}, {star: '天孤星', hero: '鲁智深', nickname: '花和尚'}, {star: '天伤星', hero: '武松', nickname: '行者'}, {star: '天立星', hero: '董平', nickname: '双枪将'}, {star: '天捷星', hero: '张清', nickname: '没羽箭'}, {star: '天暗星', hero: '杨志', nickname: '青面兽'}, {star: '天佑星', hero: '徐宁', nickname: '金枪手'}, {star: '天空星', hero: '索超', nickname: '急先锋'}, {star: '天速星', hero: '戴宗', nickname: '神行太保'}, {star: '天异星', hero: '刘唐', nickname: '赤发鬼'}, {star: '天杀星', hero: '李逵', nickname: '黑旋风'}, {star: '天微星', hero: '史进', nickname: '九纹龙'}, {star: '天究星', hero: '穆弘', nickname: '没遮拦'}, {star: '天退星', hero: '雷横', nickname: '插翅虎'}, {star: '天寿星', hero: '李俊', nickname: '混江龙'}, {star: '天剑星', hero: '阮小二', nickname: '立地太岁'}, {star: '天竟星', hero: '张横', nickname: '船火儿'}, {star: '天罪星', hero: '阮小五', nickname: '短命二郎'}, {star: '天损星', hero: '张顺', nickname: '浪里白条'}, {star: '天败星', hero: '阮小七', nickname: '活阎罗'}, {star: '天牢星', hero: '杨雄', nickname: '病关索'}, {star: '天慧星', hero: '石秀', nickname: '拼命三郎'}, {star: '天暴星', hero: '解珍', nickname: '两头蛇'}, {star: '天哭星', hero: '解宝', nickname: '双尾蝎'}, {star: '天巧星', hero: '燕青', nickname: '浪子'}, {star: '地魁星', hero: '朱武', nickname: '神机军师'}, {star: '地煞星', hero: '黄信', nickname: '镇三山'}, {star: '地勇星', hero: '孙立', nickname: '病尉迟'}, {star: '地杰星', hero: '宣赞', nickname: '丑郡马'}, {star: '地雄星', hero: '郝思文', nickname: '井木犴'}, {star: '地威星', hero: '韩滔', nickname: '百胜将'}, {star: '地英星', hero: '彭玘', nickname: '天目将'}, {star: '地奇星', hero: '单廷珪', nickname: '圣水将'}, {star: '地猛星', hero: '魏定国', nickname: '神火将'}, {star: '地文星', hero: '萧让', nickname: '圣手书生'}, {star: '地正星', hero: '裴宣', nickname: '铁面孔目'}, {star: '地阔星', hero: '欧鹏', nickname: '摩云金翅'}, {star: '地阖星', hero: '邓飞', nickname: '火眼狻猊'}, {star: '地强星', hero: '燕顺', nickname: '锦毛虎'}, {star: '地暗星', hero: '杨林', nickname: '锦豹子'}, {star: '地轴星', hero: '凌振', nickname: '轰天雷'}, {star: '地会星', hero: '蒋敬', nickname: '神算子'}, {star: '地佐星', hero: '吕方', nickname: '小温侯'}, {star: '地佑星', hero: '郭盛', nickname: '赛仁贵'}, {star: '地灵星', hero: '安道全', nickname: '神医'}, {star: '地兽星', hero: '皇甫端', nickname: '紫髯伯'}, {star: '地微星', hero: '王英', nickname: '矮脚虎'}, {star: '地慧星', hero: '扈三娘', nickname: '一丈青'}, {star: '地暴星', hero: '鲍旭', nickname: '丧门神'}, {star: '地然星', hero: '樊瑞', nickname: '混世魔王'}, {star: '地猖星', hero: '孔明', nickname: '毛头星'}, {star: '地狂星', hero: '孔亮', nickname: '独火星'}, {star: '地飞星', hero: '项充', nickname: '八臂哪吒'}, {star: '地走星', hero: '李衮', nickname: '飞天大圣'}, {star: '地巧星', hero: '金大坚', nickname: '玉臂匠'}, {star: '地明星', hero: '马麟', nickname: '铁笛仙'}, {star: '地进星', hero: '童威', nickname: '出洞蛟'}, {star: '地退星', hero: '童猛', nickname: '翻江蜃'}, {star: '地満星', hero: '孟康', nickname: '玉幡竿'}, {star: '地遂星', hero: '侯健', nickname: '通臂猿'}, {star: '地周星', hero: '陈达', nickname: '跳涧虎'}, {star: '地隐星', hero: '杨春', nickname: '白花蛇'}, {star: '地异星', hero: '郑天寿', nickname: '白面郎君'}, {star: '地理星', hero: '陶宗旺', nickname: '九尾龟'}, {star: '地俊星', hero: '宋清', nickname: '铁扇子'}, {star: '地乐星', hero: '乐和', nickname: '铁叫子'}, {star: '地捷星', hero: '龚旺', nickname: '花项虎'}, {star: '地速星', hero: '丁得孙', nickname: '中箭虎'}, {star: '地镇星', hero: '穆春', nickname: '小遮拦'}, {star: '地嵇星', hero: '曹正', nickname: '操刀鬼'}, {star: '地魔星', hero: '宋万', nickname: '云里金刚'}, {star: '地妖星', hero: '杜迁', nickname: '摸着天'}, {star: '地幽星', hero: '薛永', nickname: '病大虫'}, {star: '地伏星', hero: '施恩', nickname: '金眼彪'}, {star: '地僻星', hero: '李忠', nickname: '打虎将'}, {star: '地空星', hero: '周通', nickname: '小霸王'}, {star: '地孤星', hero: '汤隆', nickname: '金钱豹子'}, {star: '地全星', hero: '杜兴', nickname: '鬼脸儿'}, {star: '地短星', hero: '邹渊', nickname: '出林龙'}, {star: '地角星', hero: '邹润', nickname: '独角龙'}, {star: '地囚星', hero: '朱贵', nickname: '旱地忽律'}, {star: '地藏星', hero: '朱富', nickname: '笑面虎'}, {star: '地平星', hero: '蔡福', nickname: '铁臂膊'}, {star: '地损星', hero: '蔡庆', nickname: '一枝花'}, {star: '地奴星', hero: '李立', nickname: '催命判官'}, {star: '地察星', hero: '李云', nickname: '青眼虎'}, {star: '地恶星', hero: '焦挺', nickname: '没面目'}, {star: '地丑星', hero: '石勇', nickname: '石将军'}, {star: '地数星', hero: '孙新', nickname: '小尉迟'}, {star: '地阴星', hero: '顾大嫂', nickname: '母大虫'}, {star: '地刑星', hero: '张青', nickname: '菜园子'}, {star: '地壮星', hero: '孙二娘', nickname: '母夜叉'}, {star: '地劣星', hero: '王定六', nickname: '活闪婆'}, {star: '地健星', hero: '郁保四', nickname: '险道神'}, {star: '地耗星', hero: '白胜', nickname: '白日鼠'}, {star: '地贼星', hero: '时迁', nickname: '鼓上蚤'}, {star: '地狗星', hero: '段景住', nickname: '金毛犬'}];
  rawApps = [{
    logo: {
      text: '韵',
      color: 228,
    },
    name: '冰山押韵',
    desc: '国内首款支持二押及以上的韵脚工具',
    category: this.rawCategories.language,
  }, {
    logo: {
      text: '词',
      color: 0,
    },
    name: '牛窝',
    desc: '潮词一网打尽',
    category: this.rawCategories.language,
  }, {
    logo: {
      text: '视',
      color: 25,
    },
    name: '中国好视频',
    desc: '支持各大视频网站的链接提取',
    category: this.rawCategories.anv,
  }];

  apps: {[c: string]: Array<App>};

  constructor(
    private api: ApiService,
  ) {
    this.categories = new Array<Category>();
    this.categories.push(this.rawCategories.language);
    this.categories.push(this.rawCategories.anv);
    this.categories.push(this.rawCategories.about);
    this.apps = {};
    this.rawApps.forEach((app, index) => {
      const category = app.category.en;

      if (!this.apps.hasOwnProperty(category)) {
        this.apps[category] = new Array<App>();
      }
      this.apps[category].push(new App({
        logoText: app.logo.text,
        logoColor: GradientColor.lazy(app.logo.color),
        appName: app.name,
        appDesc: app.desc,
        hero: this.heroes[index],
        category: app.category,
      }));
    });

    this.apps[this.rawCategories.about.en] = [new App({
      logoText: '忠',
      logoColor: GradientColor.lazy(323),
      appName: '忠义堂',
      appDesc: '关于我的过去和现在',
      hero: new Hero({star: '', nickname: 'Author', hero: 'Jyonn'}),
      category: this.rawCategories.about,
    })];

    let appNames = '';
    for (const category of this.categories) {
      for (const app of this.apps[category.en]) {
        appNames += app.appName;
      }
    }

    this.api.getPinyin({text: appNames}, new HttpCallback({
      responseCallback: (body) => {
        let index = 0;
        for (const category of this.categories) {
          for (const app of this.apps[category.en]) {
            for (let i = 0; i < app.appName.length; i++) {
              app.chars.push({char: app.appName[i], py: body[index++]});
            }
          }
        }
      }
    }));
  }
}
