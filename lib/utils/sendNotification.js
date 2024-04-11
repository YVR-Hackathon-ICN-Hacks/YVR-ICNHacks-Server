export default async function sendNotification(data){
  await fetch("https://exp.host/--/api/v2/push/send", {
    mode: "no-cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: data,
  });
};