"use client"
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { formatAddress } from "@/lib/utils"

export const ConnectWalletButton = () => {
    const { sdk, connected, connecting, account, chainId } = useSDK()

    const connect = async () => {
        try {
            await sdk?.connect()
        } catch (error) {
            console.error(error)
        }
    }

    const disconnect = () => {
        if (sdk) {
            sdk.terminate()
        }
    }

    return (
        <div className="relative">
            {connected ? (
                <>
                    <Popover>
                        <PopoverTrigger>
                            <Button>{formatAddress(account)}</Button>
                        </PopoverTrigger>
                        <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
                            <button
                                onClick={disconnect}
                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200"
                            >
                                Disconnect
                            </button>
                        </PopoverContent>
                    </Popover>
                    <div className="block w-full px-4 py-2 text-sm text-left text-gray-700">
                        chainId: {chainId}
                    </div>
                </>
            ) :
                (
                    <Button onClick={connect} disabled={connecting}>
                        {connecting ? "Connecting..." : "Connect Wallet"}
                    </Button>
                )}
        </div>
    )
}

export const NavBar = () => {
    const host = typeof window !== "undefined" ? window.location.host : "defaultHost"

    const sdkOptions = {
        logging: {
            developerMode: false
        },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: 'next-meteamask',
            url: host,
        }
    }

    return (
        <nav className="flex items-center justify-between py-4 px-8 bg-white shadow-md">
            <div className="flex gap-4 px-6">
                <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
                    <ConnectWalletButton />
                </MetaMaskProvider>
            </div>
        </nav>
    )
}