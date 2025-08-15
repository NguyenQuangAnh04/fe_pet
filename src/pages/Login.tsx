import * as React from 'react';

export default function Login() {
    return (
        <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
           <h1 className='text-4xl font-semibold'>Welcome to PetCare</h1>
           <p className='font-medium text-lg text-center text-gray-500 mt-4'>Đăng nhập để tiếp tục!</p>
           <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Tài khoản:</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Nhập tài khoản"
                        title="Tài khoản"
                    />
                </div>
                <div>
                    <label className='text-lg font-medium'>Mật khẩu:</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Nhập mật khẩu"
                        title="Mật khẩu"
                    />
                </div>
                <div className='mt-8 flex justify-between items-center'>
                        <div>
                           <input type="checkbox" id="rememberpass" name="rememberpass" />
                           <label className='ml-2 font-medium text-base' htmlFor="rememberpass">Nhớ mật khẩu</label>
                        </div>
                        <button className='font-medium text-base text-blue-600'>Quên mật khẩu?</button>
                </div>
                <button className='mt-6 w-full py-4 bg-blue-500 text-white rounded-xl font-semibold'>Đăng nhập</button>
           </div>
        </div>
    );
}