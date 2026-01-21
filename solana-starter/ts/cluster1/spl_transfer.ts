import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { get } from "prompt";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("D5oRq2CTevR3HEjupHmhoHyHmGJntvuEBEsC62a2HQHk");

// Recipient address
const to = new PublicKey("HL6PdCg3J4QkvxRXitkXSejfg24XV4s6GNZ4t2v1q5V8");

(async () => {
    try {

        const from_token_account = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        
        const to_token_account = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to
        );

        const signature = await transfer(
            connection,
            keypair,
            from_token_account.address,
            to_token_account.address,
            keypair,
            100_0000
        );
        console.log("Transfer successful, signature:", signature);
        // Get the token account of the fromWallet address, and if it does not exist, create it


        // Get the token account of the toWallet address, and if it does not exist, create it

        // Transfer the new token to the "toTokenAccount" we just created
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();