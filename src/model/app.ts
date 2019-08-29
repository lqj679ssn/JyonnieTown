import {GradientColor} from './gradientColor';
import {Hero} from './hero';

export class App {
  logoText: string;
  logoColor: GradientColor;
  hero: Hero;
  appName: string;
  appDesc: string;
  category: {en, cn};
  chars: Array<{char, py}>;

  constructor({logoText, logoColor, appName, appDesc, category, hero}) {
    this.logoText = logoText;
    this.logoColor = logoColor;
    this.hero = hero;
    this.appName = appName;
    this.appDesc = appDesc;
    this.category = category;
    this.chars = new Array<{char, py}>();
  }
}
