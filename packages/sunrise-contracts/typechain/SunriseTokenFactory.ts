/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { SunriseToken } from "./SunriseToken";

export class SunriseTokenFactory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _sunriseArtClub: string,
    _minter: string,
    _proxyRegistry: string,
    contractURIHash: string,
    overrides?: Overrides
  ): Promise<SunriseToken> {
    return super.deploy(
      _sunriseArtClub,
      _minter,
      _proxyRegistry,
      contractURIHash,
      overrides || {}
    ) as Promise<SunriseToken>;
  }
  getDeployTransaction(
    _sunriseArtClub: string,
    _minter: string,
    _proxyRegistry: string,
    contractURIHash: string,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _sunriseArtClub,
      _minter,
      _proxyRegistry,
      contractURIHash,
      overrides || {}
    );
  }
  attach(address: string): SunriseToken {
    return super.attach(address) as SunriseToken;
  }
  connect(signer: Signer): SunriseTokenFactory {
    return super.connect(signer) as SunriseTokenFactory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SunriseToken {
    return new Contract(address, _abi, signerOrProvider) as SunriseToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_sunriseArtClub",
        type: "address",
      },
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
      {
        internalType: "contract IProxyRegistry",
        name: "_proxyRegistry",
        type: "address",
      },
      {
        internalType: "string",
        name: "contractURIHash",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "MinterLocked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "MinterUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sunriseArtClub",
        type: "address",
      },
    ],
    name: "SunriseArtClubUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "SunriseBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "SunriseCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "sunriseId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isMinterLocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxyRegistry",
    outputs: [
      {
        internalType: "contract IProxyRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newContractURIHash",
        type: "string",
      },
    ],
    name: "setContractURIHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_minter",
        type: "address",
      },
    ],
    name: "setMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sunriseArtClub",
        type: "address",
      },
    ],
    name: "setSunriseArtClub",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sunriseArtClub",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405261016d600f553480156200001757600080fd5b5060405162002d3438038062002d348339810160408190526200003a9162000227565b6040518060400160405280601081526020016f29bab73934b9b29020b93a1021b63ab160811b8152506040518060400160405280600781526020016653554e5249534560c81b8152506200009d620000976200012d60201b60201c565b62000131565b8151620000b290600190602085019062000181565b508051620000c890600290602084019062000181565b5050600b80546001600160a01b038088166001600160a01b031992831617909255600c805492871692909116919091179055506001600160601b0319606083901b1660805280516200012290600e90602084019062000181565b5050505050620003b1565b3390565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b8280546200018f9062000345565b90600052602060002090601f016020900481019282620001b35760008555620001fe565b82601f10620001ce57805160ff1916838001178555620001fe565b82800160010185558215620001fe579182015b82811115620001fe578251825591602001919060010190620001e1565b506200020c92915062000210565b5090565b5b808211156200020c576000815560010162000211565b600080600080608085870312156200023e57600080fd5b84516200024b8162000398565b80945050602080860151620002608162000398565b6040870151909450620002738162000398565b60608701519093506001600160401b03808211156200029157600080fd5b818801915088601f830112620002a657600080fd5b815181811115620002bb57620002bb62000382565b604051601f8201601f19908116603f01168101908382118183101715620002e657620002e662000382565b816040528281528b86848701011115620002ff57600080fd5b600093505b8284101562000323578484018601518185018701529285019262000304565b82841115620003355760008684830101525b989b979a50959850505050505050565b600181811c908216806200035a57607f821691505b602082108114156200037c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114620003ae57600080fd5b50565b60805160601c61295d620003d7600039600081816103b1015261117b015261295d6000f3fe608060405234801561001057600080fd5b50600436106101e55760003560e01c80634f6ccce71161010f578063b50cbd9f116100a2578063e8a3d48511610071578063e8a3d4851461040c578063e985e9c514610414578063f2fde38b14610427578063fca3b5aa1461043a57600080fd5b8063b50cbd9f146103ac578063b88d4fde146103d3578063baedc1c4146103e6578063c87b56dd146103f957600080fd5b806376daebe1116100de57806376daebe1146103785780638da5cb5b1461038057806395d89b4114610391578063a22cb4651461039957600080fd5b80634f6ccce7146103375780636352211e1461034a57806370a082311461035d578063715018a61461037057600080fd5b806318160ddd116101875780632f745c59116101565780632f745c59146102f657806342842e0e1461030957806342966c681461031c5780634c0f38c21461032f57600080fd5b806318160ddd146102a35780631e688e10146102ab57806323b872dd146102d05780632e168214146102e357600080fd5b8063081812fc116101c3578063081812fc14610252578063095ea7b3146102655780631249c58b1461027a57806313548f571461029057600080fd5b806301ffc9a7146101ea57806306fdde03146102125780630754617214610227575b600080fd5b6101fd6101f836600461243d565b61044d565b60405190151581526020015b60405180910390f35b61021a6104a9565b60405161020991906126d6565b600c5461023a906001600160a01b031681565b6040516001600160a01b039091168152602001610209565b61023a6102603660046124c0565b61053b565b610278610273366004612411565b6105e6565b005b610282610718565b604051908152602001610209565b600b5461023a906001600160a01b031681565b600954610282565b600c546101fd9074010000000000000000000000000000000000000000900460ff1681565b6102786102de36600461231d565b61083e565b6102786102f13660046122aa565b6108c5565b610282610304366004612411565b6109b2565b61027861031736600461231d565b610a5a565b61027861032a3660046124c0565b610a75565b600f54610282565b6102826103453660046124c0565b610b06565b61023a6103583660046124c0565b610baa565b61028261036b3660046122aa565b610c35565b610278610ccf565b610278610d35565b6000546001600160a01b031661023a565b61021a610e64565b6102786103a73660046123de565b610e73565b61023a7f000000000000000000000000000000000000000000000000000000000000000081565b6102786103e136600461235e565b610f56565b6102786103f4366004612477565b610fe4565b61021a6104073660046124c0565b611055565b61021a611114565b6101fd6104223660046122e4565b61113c565b6102786104353660046122aa565b61123d565b6102786104483660046122aa565b61131f565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f780e9d630000000000000000000000000000000000000000000000000000000014806104a357506104a38261144a565b92915050565b6060600180546104b890612758565b80601f01602080910402602001604051908101604052809291908181526020018280546104e490612758565b80156105315780601f1061050657610100808354040283529160200191610531565b820191906000526020600020905b81548152906001019060200180831161051457829003601f168201915b5050505050905090565b6000818152600360205260408120546001600160a01b03166105ca5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152600560205260409020546001600160a01b031690565b60006105f182610baa565b9050806001600160a01b0316836001600160a01b0316141561067b5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560448201527f720000000000000000000000000000000000000000000000000000000000000060648201526084016105c1565b336001600160a01b03821614806106975750610697813361113c565b6107095760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016105c1565b610713838361152d565b505050565b600c546000906001600160a01b031633146107755760405162461bcd60e51b815260206004820152601860248201527f53656e646572206973206e6f7420746865206d696e746572000000000000000060448201526064016105c1565b600f54600d5411156107c95760405162461bcd60e51b815260206004820152601260248201527f4d617820737570706c792072656163686564000000000000000000000000000060448201526064016105c1565b61016d600d54111580156107e95750600a600d546107e791906127e5565b155b1561081957600b54600d8054610817926001600160a01b031691600061080e836127ac565b919050556115b3565b505b600c54600d8054610839926001600160a01b031691600061080e836127ac565b905090565b6108483382611602565b6108ba5760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016105c1565b6107138383836116ea565b600b546001600160a01b031633146109455760405162461bcd60e51b815260206004820152602260248201527f53656e646572206973206e6f74207468652053756e726973652041727420436c60448201527f756200000000000000000000000000000000000000000000000000000000000060648201526084016105c1565b600b80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527f2427e0abfed4e39675108dd5a41facde209e513c8647f879037c3f26169303b4906020015b60405180910390a150565b60006109bd83610c35565b8210610a315760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201527f74206f6620626f756e647300000000000000000000000000000000000000000060648201526084016105c1565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b61071383838360405180602001604052806000815250610f56565b600c546001600160a01b03163314610acf5760405162461bcd60e51b815260206004820152601860248201527f53656e646572206973206e6f7420746865206d696e746572000000000000000060448201526064016105c1565b610ad8816118da565b60405181907ffd2d0bd3da07fa54cc94054f7f45e208b35ee1df65af4691904ce45a96cf1ca790600090a250565b6000610b1160095490565b8210610b855760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201527f7574206f6620626f756e6473000000000000000000000000000000000000000060648201526084016105c1565b60098281548110610b9857610b98612886565b90600052602060002001549050919050565b6000818152600360205260408120546001600160a01b0316806104a35760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016105c1565b60006001600160a01b038216610cb35760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016105c1565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b03163314610d295760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c1565b610d336000611999565b565b6000546001600160a01b03163314610d8f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c1565b600c5474010000000000000000000000000000000000000000900460ff1615610dfa5760405162461bcd60e51b815260206004820152601060248201527f4d696e746572206973206c6f636b65640000000000000000000000000000000060448201526064016105c1565b600c80547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16740100000000000000000000000000000000000000001790556040517f192417b3f16b1ce69e0c59b0376549666650245ffc05e4b2569089dda8589b6690600090a1565b6060600280546104b890612758565b6001600160a01b038216331415610ecc5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105c1565b3360008181526006602090815260408083206001600160a01b0387168085529083529281902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610f603383611602565b610fd25760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016105c1565b610fde84848484611a01565b50505050565b6000546001600160a01b0316331461103e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c1565b805161105190600e90602084019061217d565b5050565b6000818152600360205260409020546060906001600160a01b03166110e25760405162461bcd60e51b815260206004820152602d60248201527f53756e72697365546f6b656e3a2055524920717565727920666f72206e6f6e6560448201527f78697374656e7420746f6b656e0000000000000000000000000000000000000060648201526084016105c1565b600e6110ed83611a8a565b6040516020016110fe929190612626565b6040516020818303038152906040529050919050565b6060600e60405160200161112891906125f4565b604051602081830303815290604052905090565b6040517fc45527910000000000000000000000000000000000000000000000000000000081526001600160a01b038381166004830152600091818416917f0000000000000000000000000000000000000000000000000000000000000000169063c45527919060240160206040518083038186803b1580156111bd57600080fd5b505afa1580156111d1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f591906122c7565b6001600160a01b0316141561120c575060016104a3565b6001600160a01b0380841660009081526006602090815260408083209386168352929052205460ff165b9392505050565b6000546001600160a01b031633146112975760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c1565b6001600160a01b0381166113135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f646472657373000000000000000000000000000000000000000000000000000060648201526084016105c1565b61131c81611999565b50565b6000546001600160a01b031633146113795760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016105c1565b600c5474010000000000000000000000000000000000000000900460ff16156113e45760405162461bcd60e51b815260206004820152601060248201527f4d696e746572206973206c6f636b65640000000000000000000000000000000060448201526064016105c1565b600c80547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0383169081179091556040519081527fad0f299ec81a386c98df0ac27dae11dd020ed1b56963c53a7292e7a3a314539a906020016109a7565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f80ac58cd0000000000000000000000000000000000000000000000000000000014806114dd57507fffffffff0000000000000000000000000000000000000000000000000000000082167f5b5e139f00000000000000000000000000000000000000000000000000000000145b806104a357507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316146104a3565b600081815260056020526040902080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b038416908117909155819061157a82610baa565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006115d16115ca6000546001600160a01b031690565b8484611bbc565b60405182907f69166389dd978334f3ec4cc57c040210c5a4edd0c52f7ed2f805c11e49b3958690600090a250919050565b6000818152600360205260408120546001600160a01b031661168c5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201527f697374656e7420746f6b656e000000000000000000000000000000000000000060648201526084016105c1565b600061169783610baa565b9050806001600160a01b0316846001600160a01b031614806116d25750836001600160a01b03166116c78461053b565b6001600160a01b0316145b806116e257506116e2818561113c565b949350505050565b826001600160a01b03166116fd82610baa565b6001600160a01b0316146117795760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016105c1565b6001600160a01b0382166117f45760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f2061646460448201527f726573730000000000000000000000000000000000000000000000000000000060648201526084016105c1565b6117ff838383611d6a565b61180a60008261152d565b6001600160a01b0383166000908152600460205260408120805460019290611833908490612715565b90915550506001600160a01b03821660009081526004602052604081208054600192906118619084906126e9565b909155505060008181526003602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60006118e582610baa565b90506118f381600084611d6a565b6118fe60008361152d565b6001600160a01b0381166000908152600460205260408120805460019290611927908490612715565b909155505060008281526003602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b600080546001600160a01b038381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611a0c8484846116ea565b611a1884848484611e22565b610fde5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016105c1565b606081611aca57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611af45780611ade816127ac565b9150611aed9050600a83612701565b9150611ace565b60008167ffffffffffffffff811115611b0f57611b0f6128b5565b6040519080825280601f01601f191660200182016040528015611b39576020820181803683370190505b5090505b84156116e257611b4e600183612715565b9150611b5b600a866127e5565b611b669060306126e9565b60f81b818381518110611b7b57611b7b612886565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611bb5600a86612701565b9450611b3d565b6001600160a01b038216611c125760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105c1565b6000818152600360205260409020546001600160a01b031615611c775760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105c1565b611c8360008383611d6a565b6001600160a01b0382166000908152600460205260408120805460019290611cac9084906126e9565b909155505060008181526003602052604080822080547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b03868116919091179091559051839291861691907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a480826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6001600160a01b038316611dc557611dc081600980546000838152600a60205260408120829055600182018355919091527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0155565b611de8565b816001600160a01b0316836001600160a01b031614611de857611de88382611fed565b6001600160a01b038216611dff576107138161208a565b826001600160a01b0316826001600160a01b031614610713576107138282612139565b60006001600160a01b0384163b15611fe2576040517f150b7a020000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063150b7a0290611e7f90339089908890889060040161269a565b602060405180830381600087803b158015611e9957600080fd5b505af1925050508015611ee7575060408051601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201909252611ee49181019061245a565b60015b611f97573d808015611f15576040519150601f19603f3d011682016040523d82523d6000602084013e611f1a565b606091505b508051611f8f5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016105c1565b805181602001fd5b7fffffffff00000000000000000000000000000000000000000000000000000000167f150b7a02000000000000000000000000000000000000000000000000000000001490506116e2565b506001949350505050565b60006001611ffa84610c35565b6120049190612715565b600083815260086020526040902054909150808214612057576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b60095460009061209c90600190612715565b6000838152600a6020526040812054600980549394509092849081106120c4576120c4612886565b9060005260206000200154905080600983815481106120e5576120e5612886565b6000918252602080832090910192909255828152600a9091526040808220849055858252812055600980548061211d5761211d612857565b6001900381819060005260206000200160009055905550505050565b600061214483610c35565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b82805461218990612758565b90600052602060002090601f0160209004810192826121ab57600085556121f1565b82601f106121c457805160ff19168380011785556121f1565b828001600101855582156121f1579182015b828111156121f15782518255916020019190600101906121d6565b506121fd929150612201565b5090565b5b808211156121fd5760008155600101612202565b600067ffffffffffffffff80841115612231576122316128b5565b604051601f85017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908282118183101715612277576122776128b5565b8160405280935085815286868601111561229057600080fd5b858560208301376000602087830101525050509392505050565b6000602082840312156122bc57600080fd5b8135611236816128e4565b6000602082840312156122d957600080fd5b8151611236816128e4565b600080604083850312156122f757600080fd5b8235612302816128e4565b91506020830135612312816128e4565b809150509250929050565b60008060006060848603121561233257600080fd5b833561233d816128e4565b9250602084013561234d816128e4565b929592945050506040919091013590565b6000806000806080858703121561237457600080fd5b843561237f816128e4565b9350602085013561238f816128e4565b925060408501359150606085013567ffffffffffffffff8111156123b257600080fd5b8501601f810187136123c357600080fd5b6123d287823560208401612216565b91505092959194509250565b600080604083850312156123f157600080fd5b82356123fc816128e4565b91506020830135801515811461231257600080fd5b6000806040838503121561242457600080fd5b823561242f816128e4565b946020939093013593505050565b60006020828403121561244f57600080fd5b8135611236816128f9565b60006020828403121561246c57600080fd5b8151611236816128f9565b60006020828403121561248957600080fd5b813567ffffffffffffffff8111156124a057600080fd5b8201601f810184136124b157600080fd5b6116e284823560208401612216565b6000602082840312156124d257600080fd5b5035919050565b600081518084526124f181602086016020860161272c565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b8054600090600181811c908083168061253d57607f831692505b6020808410821415612578577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b81801561258c57600181146125bb576125e8565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008616895284890196506125e8565b60008881526020902060005b868110156125e05781548b8201529085019083016125c7565b505084890196505b50505050505092915050565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006112366007830184612523565b7f697066733a2f2f00000000000000000000000000000000000000000000000000815260006126586007830185612523565b7f2f000000000000000000000000000000000000000000000000000000000000008152835161268e81600184016020880161272c565b01600101949350505050565b60006001600160a01b038087168352808616602084015250836040830152608060608301526126cc60808301846124d9565b9695505050505050565b60208152600061123660208301846124d9565b600082198211156126fc576126fc6127f9565b500190565b60008261271057612710612828565b500490565b600082821015612727576127276127f9565b500390565b60005b8381101561274757818101518382015260200161272f565b83811115610fde5750506000910152565b600181811c9082168061276c57607f821691505b602082108114156127a6577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156127de576127de6127f9565b5060010190565b6000826127f4576127f4612828565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6001600160a01b038116811461131c57600080fd5b7fffffffff000000000000000000000000000000000000000000000000000000008116811461131c57600080fdfea2646970667358221220fddea54a25bebd87f279cc3eb7359262164795067e98a73cfbe6cff778e6054964736f6c63430008060033";