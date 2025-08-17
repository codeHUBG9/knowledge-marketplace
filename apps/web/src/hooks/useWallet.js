import { useEffect } from 'react';
import useWalletStore from '../store/walletStore';
import walletService from '../services/wallet';

const useWallet = () => {
    const wallet = useWalletStore(state => state.wallet);
    const setWallet = useWalletStore(state => state.setWallet);

    useEffect(() => {
        const loadWalletData = async () => {
            try {
                const data = await walletService.fetchWalletData();
                setWallet(data);
            } catch (error) {
                console.error('Failed to fetch wallet data:', error);
            }
        };

        loadWalletData();
    }, [setWallet]);

    return wallet;
};

export default useWallet;