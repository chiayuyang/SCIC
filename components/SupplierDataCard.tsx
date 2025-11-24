
import React from 'react';
import { SupplierData } from '../modules/types';

interface SupplierCardProps {
  supplier: SupplierData;
}

const InfoRow: React.FC<{ icon: React.ReactElement, label: string; value: string | null | undefined }> = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-start text-sm">
            <span className="text-blue-400 mr-2 mt-0.5 flex-shrink-0">{icon}</span>
            <span className="font-semibold text-gray-400 mr-2">{label}{label ? ':' : ''}</span>
            <span className="text-gray-200 break-words">{value}</span>
        </div>
    );
};

const SupplierDataCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const fullAddress = [
    supplier.Street,
    supplier.City,
    supplier.USAState?.StateName || supplier.CANProvince?.ProvinceName || supplier.Territory,
    supplier.ZIPCode || supplier.PostalCode,
    supplier.Country?.CountryName
  ].filter(Boolean).join(', ');

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] flex flex-col">
      <div className="p-5 flex-grow flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-blue-300 break-words">{supplier.SupplierName || 'No Name Provided'}</h3>
          <p className="text-xs text-gray-400">
            {supplier.SupplierNumber} || {supplier.UEI} || {supplier.CAGECode}&nbsp;&nbsp;
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                supplier.CAGEStatus.Code === 'A' 
                  ? 'bg-green-900/30 text-green-400 border-green-800' 
                  : 'bg-red-900/30 text-red-400 border-red-800'
              }`}>
                {supplier.CAGEStatus.Description || 'N/A'}
            </span>
          </p>
        </div>

        <div className="space-y-3 flex-grow mb-4">
          <InfoRow 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            label=""
            value={fullAddress} 
          />
        </div>

        {supplier.Website && (
          <div className="mt-auto pt-4 border-t border-gray-700">
            <a
              href={supplier.Website.startsWith('http') ? supplier.Website : `https://${supplier.Website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
            >
              Visit Website
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDataCard;
