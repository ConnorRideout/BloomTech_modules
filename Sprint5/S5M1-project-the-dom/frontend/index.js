function moduleProject1() {
  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // 👇 WORK WORK BELOW THIS LINE 👇

  // 👉 TASK 1 - Add a "widget" class name to widgets so CSS kicks in
  //  ✨ add your code here
  document
    .querySelectorAll("div")
    .forEach((div) => div.classList.add("widget"));

  // 👉 TASK 2 - Build a "Quote of the Day" widget
  //  ✨ add your code here
  const getRandInt = (count = 10) => Math.floor(Math.random() * count);
  let qodQuote = document.createElement("div");
  const qodAuthor = document.createElement("div");
  let quoteDiv = document.querySelector(".quoteoftheday");
  quoteDiv.appendChild(qodQuote);
  quoteDiv.appendChild(qodAuthor);
  let quoteData = quotes[getRandInt()];
  qodQuote.textContent = quoteData.quote;
  qodAuthor.textContent = `${quoteData.author} in ${
    quoteData.date ? quoteData.date : "an unknown date"
  }`;

  // 👉 TASK 3 - Build a "Corporate Speak" widget
  //  ✨ add your code here
  let corpSpeak = document.createElement("p");
  document.querySelector(".corporatespeak").appendChild(corpSpeak);
  let [verb1, verb2] = [verbs[getRandInt()], verbs[getRandInt()]];
  let [noun1, noun2] = [nouns[getRandInt()], nouns[getRandInt()]];
  let [adverb1, adverb2] = [adverbs[getRandInt()], adverbs[getRandInt()]];
  corpSpeak.textContent = `We need to ${verb1} our ${noun1} ${adverb1} in order to ${verb2} our ${noun2} ${adverb2}.`;

  // 👉 TASK 4 - Build a "Countdown" widget
  //  ✨ add your code here
  let countDown = document.createElement("p");
  document.querySelector(".countdown").appendChild(countDown);
  let count = 5;
  countDown.textContent = "T-minus 5...";
  let interval = setInterval(() => {
    count--;
    if (count) {
      countDown.textContent = `T-minus ${count}...`;
    } else {
      countDown.textContent = "Liftoff! 🚀";
      clearInterval(interval);
    }
  }, 1000);

  // 👉 TASK 5 - Build a "Friends" widget
  //  ✨ add your code here
  let friendsWgt = document.createElement("p");
  document.querySelector(".friends").appendChild(friendsWgt);
  let person = people[getRandInt(15)];
  let friends = [];
  person.friends.forEach((id) => {
    let friend = people.find((p) => p.id === id);
    friends.push(`${friend.fname} ${friend.lname}`);
  });
  let friendsList =
    friends.length > 1
      ? `is friends with ${friends.slice(0, -1).join(", ")} and ${friends.at(
          -1
        )}`
      : friends.length
      ? `is friends with ${friends[0]}`
      : "has no friends";
  friendsWgt.textContent = `${person.fname} ${
    person.lname
  } was born in ${person.dateOfBirth.slice(0, 4)} and ${friendsList}.`;

  // 👉 TASK 6 - Make it so user can tab through the widgets
  //  ✨ add your code here
  let widgets = document.querySelectorAll(".widget");
  for (let idx = 0; idx < widgets.length; idx++) {
    widgets[idx].setAttribute("tabindex", `${idx + 1}`);
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT WORK BELOW THIS LINE
// ❗ DO NOT WORK BELOW THIS LINE
// ❗ DO NOT WORK BELOW THIS LINE
if (typeof module !== "undefined" && module.exports)
  module.exports = { moduleProject1 };
else moduleProject1();
