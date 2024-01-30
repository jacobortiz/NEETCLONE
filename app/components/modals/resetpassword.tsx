export function ResetPassword() {
    return (
        <form className='space-y-6 px-6 lg:px pb-4 sm:pb-6 xl:pb-8'>
            <h3 className='text-xl font-medium text-white'> 
                Reset Password
            </h3>
            <p className="text-sm text-white">
                Forgot Password? Enter e-mail below to reset it.
            </p>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    Your email
                </label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" 
                    placeholder="name@neetclone.io"
                />
            </div>
            <button type="submit" className='w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm
                px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'>
                Reset Password
            </button>
        </form>       
    )
}