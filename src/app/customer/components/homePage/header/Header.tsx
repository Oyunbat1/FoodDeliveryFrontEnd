import React, { ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CardFoodItem from "../menuContainer/category/CardFoodItem";
import { Input } from "@/components/ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  MapPinHouse,
  ChevronRight,
  X,
  Coffee,
  Timer,
  Map,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Header() {
  const router = useRouter();
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleInSearch, setToggleInSearch] = useState(false);

  const HandleToggleSeach = () => {
    setToggleInSearch(false);
    setToggleSearch(false);
  };

  return (
    <motion.div className="fixed h-[80px] left-0 top-0 right-0 bg-black flex items-center justify-around gap-x-164 z-10">
      <div className="flex gap-2 items-center">
        <Image
          src={`/customer/logo.png`}
          width={45}
          height={20}
          alt="logo"
          className="h-[37.29px] w-[46px]"
        ></Image>
        <div className="text-white">
          <h1 className="text-[20px] font-[600]">
            Nom <span className="text-red-600">Nom</span>
          </h1>
          <p className="text-[12px] font-[400]">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-2">
        {!toggleSearch && (
          <Dialog>
            <DialogTrigger
              asChild
              className="border border-white flex items-center  rounded-full px-4 cursor-pointer"
            >
              <div className="border border-white flex items-center rounded-full px-4 cursor-pointer">
                <MapPinHouse className="text-red-600" />
                <label className="text-red-600 pl-2">Delivery address:</label>
                <Input
                  className="w-[110px] h-[36px] text-white outline-0 border-0 focus-visible:ring-0 placeholder:text-gray-400"
                  placeholder="Add Location"
                />
                <ChevronRight className="text-gray-400" />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delivery Address</DialogTitle>
                <DialogDescription className="mt-8">
                  <div className="w-[432px] h-[112px] border hover:border-gray-400">
                    <textarea
                      className="w-full h-full resize-none p-2 outline-none focus-visible:ring-0"
                      placeholder="Enter your text here..."
                    ></textarea>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-6 mr-6 flex gap-4">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={() => {
                    setToggleSearch(true);
                  }}
                  type="submit"
                >
                  Deliver here
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {toggleSearch && (
          <div className=" w-[318.63px] border border-white flex items-center gap-2 rounded-full px-4">
            <MapPinHouse className="text-red-600 "></MapPinHouse>
            <Input
              onClick={() => setToggleInSearch(true)}
              className="w-[151px] h-[36px] text-white outline-0 border-0 focus-visible:ring-0 placeholder:text-gray-400"
              placeholder="Add Location"
            ></Input>{" "}
            {toggleInSearch && (
              <X
                onClick={HandleToggleSeach}
                className="text-white w-[16px] ml-[80px]"
              ></X>
            )}
          </div>
        )}
        <Sheet>
          <SheetTrigger className=" h-[36px] w-[36px] bg-white flex justify-center items-center rounded-full text-black hover:bg-gray-200">
            <ShoppingCart></ShoppingCart>
          </SheetTrigger>
          <SheetContent className="bg-gray-500">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                {" "}
                <ShoppingCart className="text-white"></ShoppingCart>
                <h1 className="text-white"> Order detail</h1>
              </SheetTitle>
              <SheetDescription>
                <Tabs defaultValue="order" className="w-[360px]">
                  <TabsList className="grid w-full grid-cols-2 rounded-full mt-2">
                    <TabsTrigger
                      value="card"
                      className="bg-red-400 rounded-full"
                    >
                      Card
                    </TabsTrigger>
                    <TabsTrigger
                      value="order"
                      className="bg-red-400 rounded-full"
                    >
                      Order
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="card">
                    <div>
                      <div className="w-[350px] h-[350px] bg-white rounded-md p-[20px]">
                        <div className="text-[20px] font-[600] text-black ">
                          My cart
                        </div>
                        <CardFoodItem></CardFoodItem>
                        <CardFoodItem></CardFoodItem>
                        <Button className=" border border-red-600 bg-white text-red-600 w-full mt-2 hover:bg-red-200">
                          Add food
                        </Button>
                      </div>
                      <div className="w-[350px] h-[176px] bg-white rounded-md mt-[10px] p-[20px] flex flex-col gap-2">
                        <div className="text-black font-bold">Payment info</div>
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <div>Items</div>
                            <div className="font-bold">$12.99</div>
                          </div>
                          <div className="flex justify-between">
                            <div>Shipping</div>
                            <div className="font-bold">$12.99</div>
                          </div>
                        </div>
                        <div className="bg-gray-400 border-t border-dashed border"></div>
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <div>Total</div>
                            <div>$13.98</div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                className="bg-red-400 rounded-full text-white mt-2"
                                variant="outline"
                              >
                                Checkout
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="flex flex-col gap-6 items-center">
                              <DialogHeader className="flex flex-col items-center gap-4">
                                <DialogTitle>
                                  Your order has been successfully placed !
                                </DialogTitle>
                                <DialogDescription>
                                  <Image
                                    src={`/customer/illustration.png`}
                                    width={45}
                                    height={20}
                                    alt="logo"
                                    className="h-[105.7px] w-[66px] mr-2"
                                  ></Image>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogClose asChild>
                                <Button
                                  className="w-[100px]"
                                  type="button"
                                  variant="secondary"
                                >
                                  Close
                                </Button>
                              </DialogClose>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="order">
                    <div className="w-[350px] h-[530px] bg-white rounded-md ml-1 p-[20px] flex flex-col gap-2">
                      <div className="font-[600] text-black text-[16px]">
                        Order history
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-[600] text-black text-[16px]">
                          $26.99 (#20156)
                        </div>
                        <Button className="bg-white rounded-full border border-red-600 text-black">
                          Pending
                        </Button>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <Coffee></Coffee>
                          </div>
                          <div>Sunshine Stackers</div>
                        </div>
                        <div className="flex">
                          <div className="flex items-center">
                            <X className="w-[14px]"></X>
                          </div>
                          <div className="text-[16px]">1</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Timer></Timer>
                        <div>2024/12/20</div>
                      </div>
                      <div className="flex gap-2">
                        <Map></Map>
                        <div>Location</div>
                      </div>
                      <div className="w-full border border-dashed border-gray-400"></div>
                      <div className="flex justify-between items-center">
                        <div className="font-[600] text-black text-[16px]">
                          $26.99 (#20156)
                        </div>
                        <Button className="bg-gray-300 rounded-full  text-black">
                          Delivered
                        </Button>
                      </div>
                      <div className="flex justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div>
                            <Coffee></Coffee>
                          </div>
                          <div>Sunshine Stackers</div>
                        </div>
                        <div className="flex">
                          <div className="flex items-center">
                            <X className="w-[14px]"></X>
                          </div>
                          <div className="text-[16px]">1</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Timer></Timer>
                        <div>2024/12/20</div>
                      </div>
                      <div className="flex gap-2">
                        <Map></Map>
                        <div>Location</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Popover>
          <PopoverTrigger className="bg-red-600 hover:bg-red-400 w-[36px] h-[36px] flex justify-center items-center rounded-full">
            {" "}
            <User className="text-white"></User>
          </PopoverTrigger>
          <PopoverContent className="w-[188px] h-[104px] flex flex-col items-center gap-2">
            <h1>Test@gmail.com</h1>
            <Button className="w-[80px] h-[36px] rounded-full bg-[#F4F4F5] text-black hover:bg-gray-200">
              Sign out
            </Button>
          </PopoverContent>
        </Popover>

        {/* <Button
          className=" transition-all duration-200 bg-white text-black text-[14px] font-[400]  w-[75px] h-[36px] rounded-full hover:bg-gray-200"
          onClick={() => router.push("/customer/components/loginInfo/email")}
        >
          Sign up
        </Button>

        <Button className=" transition-all duration-200 bg-red-600 text-white text-[14px] font-[400] w-[75px] h-[36px] rounded-full hover:bg-red-400 ">
          Log in
        </Button> */}
      </div>
    </motion.div>
  );
}

export default Header;
