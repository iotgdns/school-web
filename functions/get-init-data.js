exports.handler = function(req, res, db) {
  var toSend = {};
  var news = []
  const idata = db.collection("web_data").doc("init");
  idata
    .get()
    .then(doc => {
      if (!doc.exists) {
        res.send({ data: "error" });
      } else {
        toSend.init = doc.data();
      }
    })
    .catch(err => {
      console.log("Error getting document", err);
      res.send({ data: err });
    });
  const ne = db.collection("news");
  ne.where('homepage', '==', true)
    .get()
    .then(doc => {
      if (doc.empty) {
        res.send({ data: "error" });
      }
      doc.forEach(d => {
        news.push(d.data())
      });
      toSend.news = news
      res.send(toSend);
    })
    .catch(err => {
      console.log("Error getting document", err);
      res.send({ data: err });
    });
    
};
