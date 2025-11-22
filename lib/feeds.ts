export type FeedItem = {
    name: string;
    url: string;
  };
  
  export type FeedCategoryMap = {
    [category: string]: FeedItem[];
  };
  
  export const feeds: FeedCategoryMap = {
    Bilim: [
      { name: "Arkeofili", url: "https://arkeofili.com/feed/" },
      { name: "Beyinsizler", url: "https://beyinsizler.net/feed/" },
      { name: "Bilim Günlüğü", url: "https://www.bilimgunlugu.com/feed/" },
      { name: "Bilim ve Gelecek", url: "https://bilimvegelecek.com.tr/index.php/feed/" },
      { name: "Evrim Ağacı", url: "https://evrimagaci.org/rss.xml" },
      { name: "Fizikist", url: "https://www.fizikist.com/feed" },
      { name: "Gerçek Bilim", url: "https://www.gercekbilim.com/feed/" },
      { name: "Gelecek Bilimde", url: "https://gelecekbilimde.net/feed/" },
      { name: "Popular Science", url: "https://popsci.com.tr/feed/" },
      { name: "Sarkaç", url: "https://sarkac.org/feed/" },
    ],
  
    Teknoloji: [
      { name: "CHIP Online", url: "https://www.chip.com.tr/rss" },
      { name: "Donanım Haber", url: "https://www.donanimhaber.com/rss/tum/" },
      { name: "LOG", url: "https://www.log.com.tr/feed/" },
      { name: "Technopat", url: "https://www.technopat.net/feed/" },
      { name: "Teknoblog", url: "https://www.teknoblog.com/feed/" },
      { name: "TeknolojiOku", url: "https://www.teknolojioku.com/export/rss" },
      { name: "Webmasto", url: "https://webmasto.com/feed" },
      { name: "Webrazzi", url: "https://webrazzi.com/feed" },
      { name: "HWP", url: "https://hwp.com.tr/feed" },
      { name: "Swipeline", url: "https://swipeline.co/feed/" },
    ],
  
    Eğlence: [
      { name: "22 Dakika", url: "https://22dakika.org/feed/" },
      { name: "Atarita", url: "https://www.atarita.com/feed/" },
      { name: "Altyazı", url: "https://altyazi.net/feed/" },
      { name: "Bigumigu", url: "https://bigumigu.com/feed/" },
      { name: "Bilimkurgu Kulübü", url: "https://www.bilimkurgukulubu.com/feed/" },
      { name: "Fantastik Canavarlar", url: "https://fantastikcanavarlar.com/feed/" },
      { name: "FRPNET", url: "https://frpnet.net/feed" },
      { name: "Geekyapar", url: "https://geekyapar.com/feed/" },
      { name: "IGN Türkiye", url: "https://tr.ign.com/feed.xml" },
      { name: "Turuncu Levye", url: "https://www.turunculevye.com/feed/" },
    ],
  
    "Kültür ve Sanat": [
      { name: "10layn", url: "https://10layn.com/feed/" },
      { name: "Artdog", url: "https://artdogistanbul.com/feed/" },
      { name: "Argonotlar", url: "https://argonotlar.com/feed/" },
      { name: "Arkitera", url: "https://www.arkitera.com/feed/" },
      { name: "Bant Mag", url: "https://bantmag.com/feed/" },
      { name: "Çekiçle Felsefe", url: "https://cekiclefelsefe.com/feed/" },
      { name: "Edebiyat Haber", url: "https://www.edebiyathaber.net/feed/" },
      { name: "Fikir Turu", url: "https://fikirturu.com/feed/" },
      { name: "Manifold", url: "https://manifold.press/rss" },
      { name: "Nouvart", url: "https://www.nouvart.net/feed/" },
    ],
  
    Spor: [
      { name: "A Spor", url: "https://www.aspor.com.tr/rss/anasayfa.xml" },
      { name: "Ajans Spor", url: "https://ajansspor.com/rss" },
      { name: "Fotomaç", url: "https://www.fotomac.com.tr/rss/anasayfa.xml" },
      { name: "Fotospor", url: "https://www.fotospor.com/feed/rss_sondakika.xml" },
      { name: "Kontraspor", url: "https://kontraspor.com/rss" },
      { name: "NTV Spor", url: "https://www.ntvspor.net/rss/anasayfa" },
      { name: "Sözcü Spor", url: "https://www.sozcu.com.tr/feeds-rss-category-spor" },
      { name: "Megabayt Spor", url: "https://www.megabayt.com/rss/categorynews/spor" },
      { name: "Turkmmo Spor", url: "https://www.turkmmo.com/feed" },
      { name: "TRT Spor", url: "https://www.trtspor.com.tr/rss/" },
    ],
  
    Gündem: [
      { name: "ABC Haber", url: "https://abcgazetesi.com.tr/rss" },
      { name: "A Haber", url: "https://www.ahaber.com.tr/rss/gundem.xml" },
      { name: "Anadolu Ajansı", url: "https://www.aa.com.tr/tr/rss/default?cat=guncel" },
      { name: "BBC Türkçe", url: "https://feeds.bbci.co.uk/turkce/rss.xml" },
      { name: "BirGün", url: "https://www.birgun.net/rss/home" },
      { name: "CNN Türk", url: "https://www.cnnturk.com/feed/rss/all/news" },
      { name: "Cumhuriyet", url: "https://www.cumhuriyet.com.tr/rss/son_dakika.xml" },
      { name: "Diken", url: "https://www.diken.com.tr/feed/" },
      { name: "Gazete Duvar", url: "https://www.gazeteduvar.com.tr/export/rss" },
      { name: "T24", url: "https://t24.com.tr/rss" },
    ],
  
    "Savunma ve Sanayi": [
      { name: "C4 Defence", url: "https://www.c4defence.com/feed/" },
      { name: "DefenceTurk", url: "https://www.defenceturk.net/feed" },
      { name: "SavunmaTR", url: "https://www.savunmatr.com/feed/" },
      { name: "SavunmaSanayiST", url: "https://www.savunmasanayist.com/feed/" },
      { name: "Mavi Savunma", url: "https://mavisavunma.com/feed/" },
      { name: "Sanayi Gazetesi", url: "https://sanayigazetesi.com.tr/kategori/savunma-haberleri/feed/" },
      { name: "Savunma Sanayi Gazetesi", url: "https://savunmasanayigazetesi.com.tr/feed/" },
      { name: "MSB Haber", url: "https://www.msb.gov.tr/rss" },
      { name: "Teknokulis Savunma", url: "https://www.teknokulis.com/rss" },
      { name: "Defence News TR", url: "https://www.defencenewstr.com/feed/" },
    ],
  
    "Ekonomi ve Finans": [
      { name: "Bigpara", url: "https://bigpara.hurriyet.com.tr/rss/" },
      { name: "Döviz", url: "https://www.doviz.com/news/rss" },
      { name: "Foreks", url: "https://www.foreks.com/rss/" },
      { name: "Forbes Türkiye", url: "https://www.forbes.com.tr/rss" },
      { name: "Investing Haberler", url: "https://tr.investing.com/rss/news.rss" },
      { name: "Investing Kripto", url: "https://tr.investing.com/rss/302.rss" },
      { name: "Megabayt Ekonomi", url: "https://www.megabayt.com/rss/categorynews/ekonomi" },
      { name: "Sözcü Ekonomi", url: "https://www.sozcu.com.tr/feeds-rss-category-ekonomi" },
      { name: "CNBC-e", url: "https://www.cnbce.com/rss" },
      { name: "Ekonomi Gazetesi", url: "https://www.ekonomigazetesi.com/rss.xml" },
    ],
  
    "İş Dünyası": [
      { name: "İşin Detayı", url: "https://www.isindetayi.com/rss" },
      { name: "İş Dünyası Haberleri", url: "https://www.isindetayi.com/rss/is-dunyasi" },
      { name: "İş Dünyası Finans", url: "https://www.isindetayi.com/rss/finans" },
      { name: "İş Dünyası Şirket", url: "https://www.isindetayi.com/rss/sirket-haberleri" },
      { name: "Midas", url: "https://www.getmidas.com/feed/" },
      { name: "Megabayt Şirket", url: "https://www.megabayt.com/rss/categorynews/sirket-haberleri" },
      { name: "Ekonomi Borsa", url: "https://www.isindetayi.com/rss/borsa" },
      { name: "Ekonomi Gayrimenkul", url: "https://www.isindetayi.com/rss/gayrimenkul" },
      { name: "Ekonomi Lojistik", url: "https://www.isindetayi.com/rss/lojistik" },
      { name: "Şirket Haberleri", url: "https://www.dunya.com/rss?dunya" },
    ],
  
    Yaşam: [
      { name: "Anne Kaz", url: "https://www.annekaz.com/feed" },
      { name: "Istanbul Life", url: "https://istanbullife.com.tr/feed/" },
      { name: "Live To Bloom", url: "https://livetobloom.com/feed/" },
      { name: "Martı Dergisi", url: "https://www.martidergisi.com/feed/" },
      { name: "Uplifers", url: "https://www.uplifers.com/feed/" },
      { name: "PlumeMag", url: "https://www.plumemag.com/feed/" },
      { name: "Medium Türkiye", url: "https://mediumturkiye.com/feed" },
      { name: "Medium Türkçe", url: "https://medium.com/feed/t%C3%BCrkiye" },
      { name: "Megabayt Yaşam", url: "https://www.megabayt.com/rss/categorynews/yasam" },
      { name: "İşin Detayı Yaşam", url: "https://www.isindetayi.com/rss/yasam" },
    ],
  };
  
  export function getAllFeeds(): FeedItem[] {
    return Object.values(feeds).flat();
  }
  
  export function getCategories() {
    return Object.keys(feeds);
  }
  
  export function getCategoryFeeds() {
    return feeds;
  }
  