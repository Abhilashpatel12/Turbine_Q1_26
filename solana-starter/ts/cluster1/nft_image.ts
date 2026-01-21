import wallet from "../wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ 
  address: "https://devnet.irys.xyz",
  timeout: 60000 
}));
umi.use(signerIdentity(signer));

(async () => {
    try {

        const image = await readFile("./generug.png")
        const file = createGenericFile(image, "generug.png",{
            contentType: "image/png"
        })
        const [myuri] = await umi.uploader.upload([file])
 
        console.log("Your image URI: ", myuri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
