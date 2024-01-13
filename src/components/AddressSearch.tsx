import { StoreType } from '@/interface';
import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface AddressProps {
  setVelue: UseFormSetValue<StoreType>;
  register: UseFormRegister<StoreType>;
  errors: FieldErrors<StoreType>;
}

export default function AddressSearch({ register, errors, setVelue }: AddressProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setVelue('address', fullAddress);
    setIsOpen(false);
  };

  return (
    <>
      <div className="col-span-full">
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
          주소 (다음 주소)
        </label>

        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <input
              readOnly
              placeholder="주소를 검색해주세요"
              {...register('address', { required: true })}
              className="block w-full bg-slate-100 rounded-md border-0 py-1.5 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
            />
            <button
              type="button"
              onClick={() => setIsOpen((val) => !val)}
              className="bg-blue-700 hover:bg-blue-600 py-1.5 px-2 rounded text-white"
            >
              주소 검색
            </button>

            {errors?.address?.type === 'required' && (
              <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
}
