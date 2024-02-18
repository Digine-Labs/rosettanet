PARAMETERS:
none

REQUEST:

curl {{STARKNET RPC}}
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"starknet_pendingTransactions","params":[],"id":0}'

RESULT:

{
    "jsonrpc": "2.0",
    "result": [{
        "type": "INVOKE",
        "transaction_hash": "0x51b20a0fc4372f88251e85b273b3fdd1840abde65cd65861691abd8eae8ae24",
        "max_fee": "0x173ef69c85ddc",
        "version": "0x0",
        "signature": ["0x30f5c0835f649d07e0335bcfe9a2844ff644ba5ae746853ac607b304f4ef551", "0x87428cbd6d283c49652003effa075d1479f6ca24e7e6dae5da5e16a587875"],
        "nonce": "0x0",
        "contract_address": "0x8451e87f44cdadbe0e235804753194d24939603a025324ca380e73806e39a6",
        "entry_point_selector": "0x15d40a3d6ca2ac30f4031e42be28da9b056fef9bb7357ac5e85627ee876e5ad",
        "calldata": ["0x1", "0x7861c4e276294a7e859ff0ae2eec0c68300ad9cbb43219db907da9bad786488", "0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354", "0x0", "0x3", "0x3", "0x697066733a2f2f516d543577517453516e4a4173423550377a76436e787574", "0x6d70424b515a756a624e666444734b664c515a363933", "0x0", "0x5"]
    },
    ...
    ]
}
