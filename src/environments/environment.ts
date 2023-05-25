// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  WEB3AUTH_ID: 'BAQ6yarrhApPOJlWKKwyq8hKWitgkASuEKT1cKDz2vf4rvbeh7lPBUhYBHpIIcLIoDIhZxmq0JpW4jqbg6Hqg3o',
  BLOCKCHAIN_CONFIG: {
    name: 'mumbai',
    chainId: "0x13881",
    rpcTarget: "https://rpc-mumbai.maticvigil.com",
  },
  TOTEM_BASE_API_URL: 'https://api.totem-explorer.com',
  TOTEM_FAUCET_API_URL: 'https://faucet.totem-explorer.com',
  TOTEM_STATIC_API_URL: 'https://static.totem.gdn',
  ASSET_RENDERER_URL: 'https://asset-renderer.totem-explorer.com',
  TRACKING_G_ID: 'G-PSFZKHJ6KR',
  TOTEM_WEB_EXPLORER_URL: 'https://demo.totem-explorer.com',
  TOTEM_API_GDN_URL: 'https://api.totem.gdn',
  TOTEM_WS_BACKEND_URL: 'wss://dev-auth-backend.totem.gdn/notifications',

  ITEM_ETH_ADDRESS: '0xEc9C96eF9b90a950057EDbe40B42385f3b1cE78C',
  AVATAR_ETH_ADDRESS: '0x11dBDbF2e6D262c2fe7e73ace1A60c6862dC14dE',
  GEM_ETH_ADDRESS: '0x981AE243e701bDbA0f6be830921c4F662ba90cE4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
