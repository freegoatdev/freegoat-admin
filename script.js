
const connectButton = document.getElementById("connect-btn");
const platformStatus = document.getElementById("wallet-status");
const walletModal = document.getElementById("wallet-modal");
const phantomConnect = document.getElementById("phantomConnect");

let walletConnected = false;

connectButton.addEventListener("click", () => {
  if (walletConnected) {
    walletConnected = false;
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("signedMessage");
    connectButton.textContent = "Conectar";
    platformStatus.textContent = "Conectar para interagir com a plataforma";
  } else {
    walletModal.classList.remove("hidden");
  }
});

phantomConnect.addEventListener("click", async () => {
  const provider = window?.solana;

  if (provider?.isPhantom) {
    try {
      const connectResponse = await provider.connect();
      const wallet = connectResponse.publicKey.toString();

      const message = "Autenticar login na plataforma FREEGOAT";
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");

      localStorage.setItem("walletAddress", wallet);
      localStorage.setItem("signedMessage", JSON.stringify(signedMessage));

      walletConnected = true;
      connectButton.textContent = "Desconectar";
      platformStatus.textContent = "Você está interagindo com a plataforma";
      walletModal.classList.add("hidden");

    } catch (error) {
      alert("Erro ao conectar ou assinar com a Phantom.");
      console.error(error);
    }
  } else {
    alert("Phantom Wallet não está instalada.");
  }
});
