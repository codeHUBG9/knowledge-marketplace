import React, { useEffect, useState } from 'react';
import { fetchModerationQueue, resolveFlag } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ModQueue = () => {
    const [flags, setFlags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFlags = async () => {
            try {
                const response = await fetchModerationQueue();
                setFlags(response.data);
            } catch (error) {
                console.error('Error fetching moderation queue:', error);
            } finally {
                setLoading(false);
            }
        };

        getFlags();
    }, []);

    const handleResolve = async (flagId) => {
        try {
            await resolveFlag(flagId);
            setFlags(flags.filter(flag => flag._id !== flagId));
        } catch (error) {
            console.error('Error resolving flag:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="mod-queue">
            <h2>Moderation Queue</h2>
            {flags.length === 0 ? (
                <p>No flags to review.</p>
            ) : (
                <ul>
                    {flags.map(flag => (
                        <li key={flag._id}>
                            <p>{flag.reason}</p>
                            <button onClick={() => handleResolve(flag._id)}>Resolve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModQueue;