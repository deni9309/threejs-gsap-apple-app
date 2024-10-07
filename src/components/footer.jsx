import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="space-y-0.5">
          <p className="font-semibold text-xs text-gray">
            More ways to shop:{' '}
            <span className="text-blue underline decoration-[0.8px] underline-offset-1">
              Find an Apple Store
            </span>{' '}
            or{' '}
            <span className="text-blue underline decoration-[0.8px] underline-offset-1">
              other retailer
            </span>{' '}
            near you.
          </p>
          <p className="font-semibold text-gray text-xs">
            Or call 0800 555-040-001
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full" />
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-0.5">
          <p className="font-semibold text-gray text-xs">
            Copyright &copy; 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex">
            {footerLinks.map((link, i) => (
              <p key={link} className="font-semibold text-gray text-xs">
                {link}{' '}
                {i !== footerLinks.length - 1 && (
                  <span className="mx-2">|</span>
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
