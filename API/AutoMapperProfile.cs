using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Basket, BasketResponse>().ReverseMap();
        CreateMap<BasketItem, List<BasketItemResponse>>().ReverseMap();
    }
}
