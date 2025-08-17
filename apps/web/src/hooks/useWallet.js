import { useEffect } from 'react';
import { useStore } from '../store/walletStore';
import { fetchWalletData } from '../services/wallet';

const useWallet = () => {
    const { wallet, setWallet } = useStore();

    useEffect(() => {
        const loadWalletData = async () => {
            try {
                const data = await fetchWalletData();
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