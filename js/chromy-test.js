const Chromy = require('chromy')

const main = async () => {
  let chromy = new Chromy({launchBrowser: false, port:4444})
  await chromy.goto('http://localhost:3000/test/access-creator.tests.html')
  const findings = await chromy.evaluate(() => {
    return document.querySelectorAll('.fail').length;
  })
  if (findings > 0) {
    console.error('Chromy/QUnit: Tests did not pass.');
  } else {
    console.log('Chromy/QUnit: Tests did pass.');
  }
  await chromy.close()
};

main()