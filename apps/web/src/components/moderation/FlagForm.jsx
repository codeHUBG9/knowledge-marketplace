import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { flagContent } from '../../services/api';

const FlagForm = ({ contentId, onFlagSuccess }) => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await flagContent({ ...data, userId: user.id, contentId });
            onFlagSuccess();
        } catch (error) {
            console.error("Error flagging content:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flag-form">
            <h2>Flag Content</h2>
            <div>
                <label htmlFor="reason">Reason</label>
                <select id="reason" {...register("reason", { required: true })}>
                    <option value="">Select a reason</option>
                    <option value="inappropriate">Inappropriate</option>
                    <option value="spam">Spam</option>
                    <option value="harassment">Harassment</option>
                </select>
                {errors.reason && <span>This field is required</span>}
            </div>
            <div>
                <label htmlFor="comments">Comments</label>
                <textarea id="comments" {...register("comments")} />
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Flag'}
            </button>
        </form>
    );
};

export default FlagForm;