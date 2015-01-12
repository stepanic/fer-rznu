 # StatsController
 #
 # @description :: Server-side logic for managing stats
 # @help        :: See http://links.sailsjs.org/docs/controllers

shelljs = require "shelljs"

module.exports =
  stats: (req, res) ->
    shelljs.exec "pwd"
    shelljs.exec "hadoop fs -rm /lab2/request.log"
    shelljs.exec "hadoop fs -rm -f -r /lab2/stats/url/out"
    shelljs.exec "hadoop fs -rm -f -r /lab2/stats/browser/out"
    shelljs.exec "hadoop fs -copyFromLocal ./request.log /lab2/request.log"
    shelljs.exec "sleep 2"
    shelljs.exec "hadoop jar ../lab2-HADOOP/project/out/artifacts/Counter/Counter.jar UrlCount /lab2/request.log /lab2/stats/url/out"
    shelljs.exec "hadoop jar ../lab2-HADOOP/project/out/artifacts/Counter/Counter.jar BrowserCount /lab2/request.log /lab2/stats/browser/out"
    urls = shelljs.exec "hadoop fs -cat /lab2/stats/url/out/part-00000"
    browsers = shelljs.exec "hadoop fs -cat /lab2/stats/browser/out/part-00000"

    # Parse URLs
    u = urls.output.split "\n"

    urlStat = []
    for url in u
      if url.length > 1
        url = url.split "\t"
        urlStat.push
          id: url[0]
          value: parseInt(url[1])

    urlStat = _.sortBy(urlStat, "value").reverse()

    # Parse Browsers
    b = browsers.output.split "\n"
    console.log b

    browserStat = []
    for browser in b
      if browser.length > 1
        browser = browser.split "\t"
        browserStat.push
          id: browser[0]
          value: parseInt(browser[1])


    browserStat = _.sortBy(browserStat, "value").reverse()


    res.view "stats/stats",
      urlStat: urlStat
      browserStat: browserStat

