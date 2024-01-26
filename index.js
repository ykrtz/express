"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3 = __importStar(require("@solana/web3.js"));
const metadata = __importStar(require("./metadata")); // see metadata.ts
const axios = require('axios');
const rpcUrl = "https://cool-stylish-vineyard.solana-mainnet.quiknode.pro/10f0cd1f8051053d62a699b4a78fc74967d3236c/";
var connection = new web3.Connection(rpcUrl, "confirmed");
// Fetch the mint address from command-line arguments
const tokenMintAddress = process.argv[2];
if (!tokenMintAddress) {
    console.error("No token mint address provided. Usage: node index.js <tokenMintAddress>");
    process.exit(1);
}
fetchMetadata(tokenMintAddress);
function fetchMetadata(mintAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const m = yield metadata.getMetadataAccount(mintAddress);
            if (!m) {
                console.log(`No metadata account found for mint address: ${mintAddress}`);
                return null;
            }
            // get the account info for that account
            const accInfo = yield connection.getAccountInfo(new web3.PublicKey(m));
            if (!accInfo) {
                console.log(`No account info found for metadata account: ${m}`);
                return null;
            }
            let decodedData = metadata.decodeMetadata(accInfo.data);
            // Fetch data from the URI
            const uri = decodedData.data.uri;
            if (uri) {
                try {
                    const response = yield axios.get(uri);
                    console.log(response.data.description);
                    return response.data.description; // This will return the data fetched from the URI
                }
                catch (error) {
                    console.error(`Error fetching data from URI ${uri}:`, error);
                }
            }
            else {
            }
            return decodedData; // Returning the metadata object if URI is not available or fetching fails
        }
        catch (error) {
            console.error(`Error fetching metadata for mint address ${mintAddress}:`, error);
            return null;
        }
    });
}
